import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SpinnerComp from "../components/SpinnerComp";
const LoadingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const { file, clothing, uniqueId } = location.state || {};

    if (!file) {
      navigate("/", { replace: true });
      return;
    }
    const formData = new FormData();
    formData.append("image1", file);
    formData.append("image2", clothing);

    const uploadImage = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/item_tryon",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setImageUrl(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    uploadImage();

    const handleUnload = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("popstate", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("popstate", handleUnload);
    };
  }, [location.state, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      {!imageUrl && (
        <div className="flex items-center justify-center">
          <SpinnerComp />
        </div>
      )}
      {imageUrl && (
        <div className="flex flex-col items-center">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="max-w-full max-h-96 mt-4 rounded-lg shadow-lg"
          />
          <a
            href={imageUrl}
            download
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Click to Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
