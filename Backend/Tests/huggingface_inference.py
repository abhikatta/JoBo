import requests

API_URL = "https://api-inference.huggingface.co/models/microsoft/trocr-large-handwritten"
headers = {"Authorization": "Bearer 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"}


def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
        print(data)
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()


output = query(r'D:\UniPro\JoBo\Backend\Tests\test\test.png')
print(output)
