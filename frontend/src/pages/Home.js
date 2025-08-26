import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import DetectionResult from "../components/DetectionResult";

function Home() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = (file, url) => {
    setImage(file);
    setImageUrl(url);
    setBoxes([]); // reset when new image uploaded
  };

  const handleDetect = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("model_name", "yolov9c");

    try {
      const res = await fetch("http://localhost:8000/detect", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setBoxes(data.boxes);
    } catch (error) {
      console.error("Error:", error);
      alert("Detection failed. Is backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="home-container">
      <h1>YOLO Object Detection</h1>
      <p>Upload an image and detect objects using a YOLO model.</p>

      <ImageUploader onUpload={handleUpload} />

      {image && (
        <button onClick={handleDetect} className="detect-btn" disabled={loading}>
          {loading ? "Detecting..." : "Detect"}
        </button>
      )}

      <DetectionResult boxes={boxes} imageUrl={imageUrl} />
    </div>
  );
}

export default Home;
