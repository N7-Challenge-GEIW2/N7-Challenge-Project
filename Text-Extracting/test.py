import cv2
import pytesseract
from pytesseract import Output

def extract_text_from_image(image_path):
    # Load image using OpenCV
    img = cv2.imread(image_path)

    # Get height and width of the image
    height, width, _ = img.shape

    # Configure Tesseract OCR
    config = r'--psm 6' 

    # Perform OCR to get word-level bounding boxes
    boxes = pytesseract.image_to_data(img, config=config, output_type=Output.DICT)

    # Extract words and their bounding boxes
    words = []
    for i in range(len(boxes['text'])):
        if int(boxes['conf'][i]) > 0:  # Confidence level threshold
            x, y, w, h = boxes['left'][i], boxes['top'][i], boxes['width'][i], boxes['height'][i]
            word = boxes['text'][i]
            words.append((word, (x, y, w, h)))

    # Draw bounding boxes around words
    for word, (x, y, w, h) in words:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.putText(img, word, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Show the image with detected words
    cv2.imshow('Detected Words', img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # Extracted text (concatenation of detected words)
    extracted_text = ' '.join(word for word, _ in words)
    return extracted_text

# Provide the path to your image
image_path = 'test.png'

# Call the function to extract text
extracted_text = extract_text_from_image(image_path)

# Print the extracted text
print(extracted_text)
