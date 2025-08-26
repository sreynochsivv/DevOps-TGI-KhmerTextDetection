import React, { useState } from "react";

function ImageUploader({ onUpload }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file, URL.createObjectURL(file));
    }
  };

  return (
    <div className="uploader">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div className="preview-container">
          <h4>Preview:</h4>
          <img src={preview} alt="preview" className="preview-image" />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
