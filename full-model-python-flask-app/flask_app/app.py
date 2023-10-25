import requests
import cv2
import easyocr
import os
import shutil
import numpy as np
from flask import Flask, request

app = Flask(__name__)

HF_TOKEN = ""  # your hugging face token here


def query(filename):
    API_URL = "https://api-inference.huggingface.co/models/microsoft/trocr-large-handwritten"
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()


def split_to_images(image_path: str):
    # Load the handwritten text image
    if request.method == 'POST':
        original_image = cv2.imread(image_path)

        # Perform text detection using EasyOCR
        reader = easyocr.Reader(['en'])  # You can add more languages as needed
        results = reader.readtext(original_image)

        # Create a directory to save individual text region images
        output_directory = './output_text_regions'
        shutil.rmtree(output_directory)

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
            output_path = os.path.join(
                output_directory, f'text_region_{i}.png')
            cv2.imwrite(output_path, cropped_text_region)

            # Draw contours around the detected text regions on the original image
            cv2.drawContours(original_image, [pts], -1, (0, 255, 0), 2)

        # Save the original image with contours around text regions
            cv2.imwrite(os.path.join(output_directory,
                        'original_with_contours.png'), original_image)

            print(
                f"Detected {len(results)} text regions. Separate images saved in '{output_directory}'.")

        return output_directory
    else:
        return "<h1>Use POST method with path: /split</h1>"


@app.route('/main', methods=['POST', 'GET'])
def main(image):
    image_path = image

    split_to_images(image_path)

    output = query(filename=image_path)
    print(output)

    text = ""
    folder_path = split_to_images(image_path)

    image_files = [f for f in os.listdir(
        folder_path) if f.endswith('.png') or f.endswith('.jpg')]

    for image_file in image_files:
        image_path = os.path.join(folder_path, image_file)
        try:
            output = query(filename=image_path)
        except:
            output = f"error for {str(image_file)}"
        text += str(output[0]['generated_text']).replace('.', " ")
    text += '.'
    print(text)
    return text


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4444)
