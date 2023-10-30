# Pyhton full page TrOCR-handwritten model using OpenCV2.

### The image is split based on the contours detected as individual images and each image is sent to the hugging face API for handwritten text detection, it also works on printed text snips like text on a screen.

# Usage:

## ⚠️NOTE: GET YOUR HUGGING FACE TOKEN AND USE IT AS HG_TOKEN IN THE FLASK APP (app.py)

1. Install requirements

```
cd full-model-python-flask-app\flask_app\final_build

pip install -r requirements.txt
```

2. Run the flask app:

```
python app.py
```

3. Run the script file:

```
python test_run.py
```

### P.S.: This flask app model isn't currently integrated into the mobile app yet.
