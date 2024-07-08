Remove recap from previus chapter by comparing imges and remove dublicates. if posibal do it in front end if not backend. Curently therse no backend. 
Add a on/off "switch" for "Remove recap from previus chapter" in ChapterQuick.html and save its state in localstorage. 


Add a way to automaticly add a domain to the allowed by sending page content(html) to a backend that reads it and saves the dommain and the way it goes to next capter. it does that by checking classes/id's for the href atrubute to the next capter. then send that to client's for use.
Then content.js shuild request all allowed domains from the backend while manifest.json allows all.
for sites like webbtoons that does not use a button/spesific class for next capter but insted shows all the chapter. i will rty to come up whit a way in the future. 
My idea for now. train some type of small LLM

Add a keybindes.html and js file to allow users to chance there keybindes. they keybindes shuild be saved in local storage. 





imges to hide if useser wants. 
https://cdn.black-clover.org/file/mookitosh/i-ll-retire-after-saving-the-world/chapter-1/1.webp







Here are some additional quality-of-life features you can consider adding to your extension to enhance the user experience:

1. **Bookmark Chapter**:
   - Allow users to bookmark the current chapter they are reading and quickly return to it later. This can be saved in local storage.

2. **Reading Progress Tracker**:
   - Implement a progress tracker that shows how much of the current chapter has been read, possibly with a progress bar at the top of the page.

3. **Night Mode**:
   - Improve the existing dark mode by not only changing the background color but also adjusting the text color, link colors, and other elements to be more visually consistent and easier on the eyes during night reading.

4. **Font Size Adjustment**:
   - Allow users to increase or decrease the font size for better readability.

5. **Full-Screen Reading Mode**:
   - Implement a full-screen mode to eliminate distractions and provide a more immersive reading experience. This can be toggled with a button or a keyboard shortcut.

6. **Custom Scroll Speed**:
   - Provide a slider or input field in the settings to allow users to customize the scroll speed more precisely.

7. **Image Zoom**:
   - Enable users to zoom in and out of images (manga panels) for a closer look.

8. **Chapter Download**:
   - Add a feature to download the current chapter as a PDF or a set of images for offline reading.

9. **Ad Blocker**:
   - Include a basic ad blocker to enhance the reading experience by removing intrusive ads.

10. **Comment Filter**:
    - Allow users to filter comments by keywords or user ratings to see only the most relevant and high-quality comments.

11. **Customizable Shortcuts**:
    - Provide an interface where users can customize the keyboard shortcuts for various actions.

12. **Auto-Next Chapter**:
    - Automatically load the next chapter when the current one is finished, with a configurable delay or an option to disable it.

13. **Theme Options**:
    - Offer different themes besides dark mode, such as sepia or gray scale, to suit different reading preferences.

14. **Notes and Annotations**:
    - Allow users to add notes or annotations to specific panels or pages, which can be saved and accessed later.

15. **Reading List Management**:
    - Integrate a reading list feature where users can manage the manga they are reading, mark chapters as read, and get notifications for new chapters.

Here's an example of how you might add a feature like font size adjustment:

