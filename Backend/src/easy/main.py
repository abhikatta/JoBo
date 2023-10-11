import easyocr

reader = easyocr.Reader()

image = reader.read_image(
    r'D:\UniPro\JoBo\Backend\Tests\test\handwritten_long.jpeg')

results = reader.detect(image)

text = []
for result in results:
    text.append(result[1])

text = "\n".join(text)

print(text)
