import React, { useEffect, useRef } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

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
      ctx.strokeStyle = "#ff1744"; // red accent
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
    <Card
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Detection Result
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            p: 1,
            backgroundColor: "#fafafa",
          }}
        >
          <canvas
            ref={canvasRef}
            className="result-canvas"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default DetectionResult;
