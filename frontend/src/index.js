import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";   // ✅ use this instead of index.css

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
