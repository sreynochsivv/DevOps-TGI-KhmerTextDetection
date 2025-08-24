import os
import time
import streamlit as st
from PIL import Image
import matplotlib.pyplot as plt
from detector import Detector

# Upload image
st.title("Object Detection")
st.write("Upload an image to detect objects")
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"], key="file_uploader")

# Display image
if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", use_container_width=True)
    
    # Select model
    model_name = st.selectbox("Select Model", ["yolov11n","yolov11n_v2", "yolov9c", "yolov8n", "yolov5x6u", "yolov5su"], key="model_selectbox")
    
    # Detect button
    if st.button("Detect", key="detect_button"):
        st.write("Detecting...")
        start = time.time()
        detector = Detector()
        result = detector.detection(model_name, image)
        end = time.time()
        st.write("Detection time: ", end - start)
        
        # Display bounding box
        st.write("Bounding Box")
        fig, ax = plt.subplots()
        ax.imshow(result.orig_img)
        for box in result.boxes.xywh:
            x_center, y_center, width, height = box
            x1 = x_center - width / 2
            y1 = y_center - height / 2
            rect = plt.Rectangle((x1, y1), width, height, fill=False, color="red")
            ax.add_patch(rect)
            
        # Hide x and y axes
        ax.axis('off')
        st.pyplot(fig)
        