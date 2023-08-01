import requests

# URL of your Flask app
API_URL = "http://10.74.30.242:5000/ocr"

# Path to the image file you want to test
image_file_path = r"D:\UniPro\JoBo\Backend\Tests\test\test.png"

# Prepare the request with the image file
files = {'file': open(image_file_path, 'rb')}

# Send the POST request to the Flask app
response = requests.post(API_URL, files=files)

# Check the response status
if response.status_code == 200:
    # Print the response content, which should contain the handwritten text recognition results
    print(response.json())
else:
    print("Error: Handwritten text recognition failed")
