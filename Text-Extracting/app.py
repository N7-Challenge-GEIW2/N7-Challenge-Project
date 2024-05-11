from flask import Flask, jsonify, render_template, request
from flask_cors import CORS 
import pytesseract
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('./index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    img = Image.open(io.BytesIO(file.read()))
    extracted_text = pytesseract.image_to_string(img)

    return jsonify({'extracted_text': extracted_text}), 200

if __name__ == '__main__':
    app.run(debug=True)