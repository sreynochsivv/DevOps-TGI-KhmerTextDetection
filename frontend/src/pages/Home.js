import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress
} from "@mui/material";
import ImageUploader from "../components/ImageUploader";
import DetectionResult from "../components/DetectionResult";
import SearchIcon from "@mui/icons-material/Search";

function Home() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = (file, previewUrl) => {
    setImage(file);
    setImageUrl(previewUrl);
  };

  const handleDetect = async () => {
    setLoading(true);

    // TODO: Call your YOLO detection API here
    // Mock delay
    setTimeout(() => {
      setBoxes([
        [150, 120, 100, 80], // mock box
        [300, 220, 120, 90] // another mock box
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 2,
        background: "linear-gradient(135deg, #f0f4f8 0%, #d9e4f5 100%)"
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            YOLO Object Detection
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Upload an image and detect objects instantly using a YOLO model.
          </Typography>
        </Box>

        {/* Upload Section */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 4 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Step 1: Upload Image
            </Typography>
            <ImageUploader onUpload={handleUpload} />
          </CardContent>
        </Card>

        {/* Detect Button */}
        {image && (
          <Box textAlign="center" mb={4}>
            <Button
              onClick={handleDetect}
              variant="contained"
              size="large"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SearchIcon />
                )
              }
              disabled={loading}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.2,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" }
              }}
            >
              {loading ? "Detecting..." : "Run Detection"}
            </Button>
          </Box>
        )}

        {/* Detection Results */}
        {imageUrl && <DetectionResult boxes={boxes} imageUrl={imageUrl} />}
      </Container>
    </Box>
  );
}

export default Home;
