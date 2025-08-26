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
            "yolov9c":  YOLO("yolov9c_100epoch.pt"),
        }
    
    def detection(self, model_name, image):
        img = Image.fromarray(np.array(image))
        img = img.convert("L")
        result = self.models[model_name](img)
        result[0].orig_img = image
        return result[0]