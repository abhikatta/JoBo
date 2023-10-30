import requests
url = "http://127.0.0.1/main:4444/"
port = 4444

if __name__ == '__main__':
    res = requests.post(url=url, json={})
