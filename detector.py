# Singleton class
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
class Detector:
    instance = None
    
    def __new__(cls):
        if cls.instance is None:
            cls.instance = super(Detector, cls).__new__(cls)
            cls.instance.__initialized = False
            cls.instance.initailize()
        return cls.instance
    
    def initailize(self):
        self.models = {
            "yolov11n": YOLO("models/yolov11n.pt"),
            "yolov11n_v2": YOLO("models/yolo11n_100p_v5.pt"),
            "yolov9c":  YOLO("models/yolov9c.pt"),
            "yolov8n": YOLO("models/yolov8n.pt"),
            "yolov5x6u": YOLO("models/yolov5x6u.pt"),
            "yolov5su": YOLO("models/yolov5su.pt"),
        }
    
    def detection(self, model_name, image):
        img = Image.fromarray(np.array(image))
        img = img.convert("L")
        result = self.models[model_name](img)
        result[0].orig_img = image
        return result[0]