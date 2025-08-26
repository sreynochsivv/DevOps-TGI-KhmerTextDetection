import React, { useEffect, useRef } from "react";

function DetectionResult({ boxes, imageUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageUrl || boxes.length === 0) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Resize canvas to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Draw boxes
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      boxes.forEach(([x, y, w, h]) => {
        const x1 = x - w / 2;
        const y1 = y - h / 2;
        ctx.strokeRect(x1, y1, w, h);
      });
    };
  }, [boxes, imageUrl]);

  if (!imageUrl) return null;

  return (
    <div className="result-container">
      <h3>Detection Result</h3>
      <canvas ref={canvasRef} className="result-canvas" />
    </div>
  );
}

export default DetectionResult;
