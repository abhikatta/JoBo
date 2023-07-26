from flask import Flask, request, render_template
from werkzeug.utils import secure_filename

from IPython.display import display
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import os
from TrOCR import do_ocr
# os.system('pip install transformers[torch] --quiet')
# print('Done')

# model setup:


processor = TrOCRProcessor.from_pretrained(
    'microsoft/trocr-large-handwritten')

model = VisionEncoderDecoderModel.from_pretrained(
    'microsoft/trocr-large-handwritten')

# flask setup:
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'jpeg'}
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe"


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower(
           ) in app.config['ALLOWED_EXTENSIONS']


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No file part in the request'
        file = request.files['file']

        try:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(app.config['UPLOAD_FOLDER'] + '/' + filename)
                file_path = (app.config['UPLOAD_FOLDER']+'/'+filename)

                return do_ocr(file_path, processor, model), display(file_path)
            else:
                return 'Invalid file. Allowed file types are: png, jpg, jpeg, gif'
        except Exception as e:
            return e

    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# import os
# import cv2
# import numpy as np
# from flask import Flask, request
# from TrOCR import do_ocr
# app = Flask(__name__)


# @app.route('/crop-lines', methods=['POST'])
# def crop_lines():
#     # Check if a file was uploaded
#     if 'photo' not in request.files:
#         return "No photo uploaded.", 400

#     photo = request.files['photo']

#     # Save the photo to a temporary file
#     temp_file = 'temp_photo.png'
#     photo.save(temp_file)

#     # Load the image
#     image = cv2.imread(temp_file)

#     # Perform the line cropping process
#     # ... (rest of the code for line cropping)
#     res = do_ocr(image)
#     # Remove the temporary file

#     os.remove(temp_file)

#     return res


# if __name__ == '__main__':
#     app.run()
