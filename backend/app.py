# backend/app.py
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from detector import Detector
from PIL import Image
import io

app = FastAPI()

# Allow frontend calls (React runs on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

detector = Detector()

@app.post("/detect")
async def detect(file: UploadFile = File(...), model_name: str = Form("yolov9c")):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    result = detector.detection(model_name, image)

    # Extract bounding boxes & class IDs
    boxes = result.boxes.xywh.tolist() if result.boxes is not None else []
    classes = result.boxes.cls.tolist() if result.boxes is not None else []

    return {"boxes": boxes, "classes": classes}
