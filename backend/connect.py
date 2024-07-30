from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
from backend import getManga

app = Flask(__name__)
CORS(app)

@app.route('/get_manga', methods=['GET'])
def get_manga():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'URL parameter is required'}), 400
    try:
        print(url)
        pdf_bytes = getManga(url)  # getManga now returns the PDF bytes
        response = make_response(pdf_bytes)
        response.headers.set('Content-Type', 'application/pdf')
        response.headers.set('Content-Disposition', 'attachment', filename='manga.pdf')
        return pdf_bytes
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
