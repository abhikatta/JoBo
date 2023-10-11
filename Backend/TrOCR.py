from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image


processor = TrOCRProcessor.from_pretrained(
    'microsoft/trocr-large-handwritten')

model = VisionEncoderDecoderModel.from_pretrained(
    'microsoft/trocr-large-handwritten')


def do_ocr(image_path, processor, model):
    # pixel_values = processor(images=Image.open(
    #     image_path), return_tensors="pt").pixel_values
    pixel_values = processor(
        images=image_path, return_tensors="pt").pixel_values
    generated_ids = model.generate(pixel_values)
    generated_text = processor.batch_decode(
        generated_ids, skip_special_tokens=True)[0]
    # with open('output.txt', 'w') as op:
    # op.write(generated_text)

    # print(generated_text)
    return str(generated_text)


do_ocr(r'D:\Projects\UniPro\JoBo_test\JoBoBackend\app2\uploads\asd.jpeg',
       processor, model)
