import requests
from bs4 import BeautifulSoup
from fpdf import FPDF
from PIL import Image
from io import BytesIO
import os
import re
import shutil
from concurrent.futures import ThreadPoolExecutor, as_completed
from natsort import natsorted
import time

def extract_domain(url):
    try:
        domain = requests.utils.urlparse(url).hostname
        return domain
    except Exception as e:
        print("Invalid URL:", e)
        return None

def fetch_html(url):
    response = requests.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, 'html.parser')

def fetch_images(chapter_url):
    soup = fetch_html(chapter_url)
    image_urls = [img['src'] for img in soup.find_all('img') if 'src' in img.attrs]
    print(f"Extracted {len(image_urls)} images from {chapter_url}")
    return image_urls

def convert_webp_to_png(webp_bytes):
    image = Image.open(BytesIO(webp_bytes)).convert("RGB")
    output = BytesIO()
    image.save(output, format="PNG")
    return output.getvalue()

def download_image(image_url, headers):
    try:
        response = requests.get(image_url, headers=headers)
        response.raise_for_status()
        return image_url, response.content, None
    except requests.exceptions.RequestException as e:
        return image_url, None, e

def get_chapter_number(url):
    match = re.search(r'chapter-(\d+)', url)
    return int(match.group(1)) if match else None

def extract_manga_name(url):
    manga_name = url.rstrip('/').split('/')[-1]
    return manga_name.replace('-', ' ').title()

def save_image(image_bytes, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(image_bytes)

def download_and_save_images(chapter_url, headers, chapter_folder):
    chapter_number = get_chapter_number(chapter_url)
    image_urls = fetch_images(chapter_url)
    for idx, image_url in enumerate(image_urls, start=1):
        _, image_bytes, error = download_image(image_url, headers)
        if image_bytes:
            if image_url.lower().endswith('.webp'):
                image_bytes = convert_webp_to_png(image_bytes)
            image_name = f'chapter_{chapter_number}_{idx}.png'
            image_path = os.path.join(chapter_folder, image_name)
            save_image(image_bytes, image_path)
            print(f"Saved image {image_name} to {image_path}")
        else:
            print(f"Failed to download image {image_url}: {error}")

def create_pdf_from_images(folder, pdf_path):
    pdf = FPDF()
    print("Starting PDF creation")
    image_files = natsorted(os.listdir(folder))
    for idx, image_file in enumerate(image_files, start=1):
        if image_file.lower().endswith(('png', 'jpg', 'jpeg')):
            image_path = os.path.join(folder, image_file)
            print(f"Adding image {idx}/{len(image_files)}: {image_file}")
            image = Image.open(image_path)
            width, height = image.size

            # Ensure the image fits within the page dimensions while maintaining aspect ratio
            max_width = 210  # A4 width in mm
            max_height = 297  # A4 height in mm

            # Calculate the scaling factor
            width_factor = max_width / width
            height_factor = max_height / height
            scaling_factor = min(width_factor, height_factor)

            # Apply the scaling factor to get the scaled dimensions
            pdf_width = width * scaling_factor
            pdf_height = height * scaling_factor

            # Calculate x and y coordinates to center the image
            x = (max_width - pdf_width) / 2
            y = (max_height - pdf_height) / 2

            pdf.add_page()
            pdf.image(image_path, x=x, y=y, w=pdf_width, h=pdf_height)
    pdf.output(pdf_path, "F")
    print(f"PDF created at {pdf_path}")

def get_size(path):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            if os.path.isfile(fp):
                total_size += os.path.getsize(fp)
    return total_size

def format_size(size):
    size_kb = size / 1024
    size_mb = size_kb / 1024
    size_gb = size_mb / 1024
    return f"{size_gb:.2f} GB, {size_mb:.2f} MB, {size_kb:.2f} KB"

def manga_scan(url):
    start_time = time.time()
    
    manga_name = extract_manga_name(url)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_folder = os.path.join(script_dir, 'mangas', manga_name)
    done_folder = os.path.join(script_dir, 'done')
    os.makedirs(base_folder, exist_ok=True)
    os.makedirs(done_folder, exist_ok=True)
    
    soup = fetch_html(url)
    chapters = [a['href'] for a in soup.select('ul.chapterslist li a.title')]
    chapters.sort(key=get_chapter_number)
    print(f"Found {len(chapters)} chapters for {url}")
    
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_chapter = {executor.submit(download_and_save_images, chapter_url, headers, os.path.join(base_folder, f'chapter_{get_chapter_number(chapter_url)}')): chapter_url for chapter_url in chapters}
        for future in as_completed(future_to_chapter):
            chapter_url = future_to_chapter[future]
            try:
                future.result()
                print(f"Finished downloading images for {chapter_url}")
            except Exception as e:
                print(f"Error downloading images for {chapter_url}: {e}")
    
    # Move all images to a single folder
    all_images_folder = os.path.join(base_folder, 'all_images')
    os.makedirs(all_images_folder, exist_ok=True)
    
    total_images = 0
    for chapter_folder in os.listdir(base_folder):
        chapter_path = os.path.join(base_folder, chapter_folder)
        if os.path.isdir(chapter_path) and chapter_folder != 'all_images':
            for image_file in os.listdir(chapter_path):
                source_path = os.path.join(chapter_path, image_file)
                destination_path = os.path.join(all_images_folder, image_file)
                os.rename(source_path, destination_path)
                total_images += 1
            os.rmdir(chapter_path)
    
    print(f"Finished downloading all images for {url}")
    print(f"Total images downloaded: {total_images}")

    # Measure the time before starting the PDF creation
    pdf_start_time = time.time()

    # Create PDF from images
    pdf_name = manga_name.replace(' ', '_') + '.pdf'
    pdf_path = os.path.join(done_folder, pdf_name)
    create_pdf_from_images(all_images_folder, pdf_path)

    # Measure the time after the PDF creation is done
    pdf_end_time = time.time()

    # Calculate the total size used
    total_size = get_size(script_dir)
    formatted_total_size = format_size(total_size)
    print(f"Total space used: {formatted_total_size}")

    # Delete the folders with the images
    shutil.rmtree(base_folder)

    # Calculate and print the elapsed time
    end_time = time.time()
    total_elapsed_time = end_time - start_time
    pdf_creation_time = pdf_end_time - pdf_start_time

    total_formatted_time = time.strftime("%H:%M:%S", time.gmtime(total_elapsed_time))
    pdf_formatted_time = time.strftime("%H:%M:%S", time.gmtime(pdf_creation_time))


    print(f"Finished downloading all images for {url}")
    print(f"Total images downloaded: {total_images}")
    print(f"Total time taken: {total_formatted_time}")
    print(f"Time taken to create PDF: {pdf_formatted_time}")

# Example usage
url = 'https://manga-scans.com/manga/the-legendary-hunter-becomes-young-again/'
manga_scan(url)
