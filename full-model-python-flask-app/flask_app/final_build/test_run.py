import requests

# Specify the URL of the Flask server endpoint
URL = "http://10.74.20.123:5000/process_image"

# Specify the path to the image file you want to send
if __name__ == '__main__':
    image_file_path = input("Give file path: ")

    # Open the image file in binary mode
    with open(image_file_path, "rb") as file:
        # Prepare the files parameter with the image file
        files = {"image": (image_file_path, file)}
        print(files)
        # Send a POST request to the Flask server with the image file
        response = requests.post(URL, files=files)

        # Print the response from the server
        text = response.json()['text']
        print(text)

    file.close()
    with open('output.txt', 'w') as out:
        out.write(text)
