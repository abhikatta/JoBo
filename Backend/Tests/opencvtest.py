import cv2
test_image_path = './test/handwritten_long.jpeg'
image = cv2.imread(test_image_path, cv2.IMREAD_GRAYSCALE)

# Adjust the threshold values as needed.
edges = cv2.Canny(image=image, threshold1=100, threshold2=200)

contours, _ = cv2.findContours(
    edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)


# def showInMovedWindow(winname, img, x, y):
#     cv2.namedWindow(winname)        # Create a named window
#     cv2.moveWindow(winname, x, y)   # Move it to (x,y)
#     cv2.GaussianBlur(img,
#                      ksize=)
#     cv2.imshow(winname, img)
#     cv2.waitKey(delay=10000)


# img = cv2.imread(test_image_path)
# showInMovedWindow(' ', img, 0, 200)
# cv2.findContours(image=img, mode=2, method=3)
