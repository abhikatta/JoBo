import os
import cv2
import numpy as np
import easyocr
import shutil
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)
HF_TOKEN = "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"  # your hugging face token
API_URL = "https://api-inference.huggingface.co/models/microsoft/trocr-large-handwritten"
HEADERS = {"Authorization": f"Bearer {HF_TOKEN}"}


def split_to_images(original_image):
    # Perform text detection using EasyOCR
    reader = easyocr.Reader(['en'])  # You can add more languages as needed
    results = reader.readtext(original_image)

    # Create a directory to save individual text region images
    output_directory = r'D:\Projects\JoBo\full-model-python-flask-app\flask_app\final_build\output_text_regions'
    try:
        shutil.rmtree(output_directory)
        os.makedirs(output_directory, exist_ok=True)
    except:
        os.makedirs(output_directory, exist_ok=True)

    # Extract and save each detected text region as a separate image
    for i, (points, _, _) in enumerate(results):
        # Convert the list of tuples to a NumPy array
        pts = np.array(points, np.int32)
        pts = pts.reshape((-1, 1, 2))

        # Create a mask for the current text region
        mask = np.zeros_like(original_image)
        cv2.fillPoly(mask, [pts], (255, 255, 255))

        # Bitwise AND operation to extract the text region
        text_region = cv2.bitwise_and(original_image, mask)

        # Find the bounding box of the text region
        x, y, w, h = cv2.boundingRect(pts)

        # Crop the text region from the original image
        cropped_text_region = original_image[y:y+h, x:x+w]

        # Save the cropped text region as a separate image
        output_path = os.path.join(output_directory, f'text_region_{i}.png')
        cv2.imwrite(output_path, cropped_text_region)

    return output_directory


@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        # Access the uploaded image from the request
        file = request.files['image']

        image_bytes = file.read()

        # Convert the image bytes to a NumPy array for processing
        nparr = np.frombuffer(image_bytes, np.uint8)
        img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Perform text splitting and recognition
        folder_path = split_to_images(img_np)

        text = ""
        image_files = [f for f in os.listdir(
            folder_path) if f.endswith('.png') or f.endswith('.jpg')]

        for image_file in image_files:
            image_path = os.path.join(folder_path, image_file)
            try:
                output = query(filename=image_path)
                print(output)
                text += str(output[0]['generated_text']).replace('.', "")+" "
            except Exception as e:
                print(f"Error processing {image_file}: {str(e)}")
                text += f"error for {str(image_file)} "

        text += '.'
        return jsonify({"text": text})

    except Exception as e:
        # Handle any exceptions that might occur during image processing
        print(f"Error processing image: {str(e)}")
        return jsonify({"error": "Error processing image"})


@app.route('/health', methods=['GET'])
def health():
    return "Server is running"


def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=HEADERS, data=data)
    return response.json()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
