import os
import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim
from flask import Flask, render_template, request
import sys
sys.path.append('./')
app = Flask(__name__, template_folder='../static')


@app.route('/', methods=['POST'])
def index():
    # Check if a file was uploaded
    if 'photo' not in request.files:
        return "No photo uploaded.", 400

    photo = request.files['photo']

    # Save the photo to a temporary file
    temp_file = 'temp_photo.png'
    photo.save(temp_file)

    # Remove the temporary file
    os.remove(temp_file)

    return render_template('index.html', title='jobobackend')


if __name__ == '__main__':
    app.run()

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
