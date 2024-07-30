import React, { useState } from "react";
import axios from "axios";
import shirt from "../shirt_test.png";
import lady from "../woman_test.png";

const Test = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("image2", image2);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/item_tryon",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error uploading the images!", error);
    }
  };

  return (
    <div>
            <h2>Upload Images</h2>
      <form onSubmit={handleSubmit}>
        <div>
                    <label>Image 1:</label>
          <input type="file" onChange={handleImage1Change} />
        </div>
        <div>
                    <label>Image 2:</label>
          <input type="file" onChange={handleImage2Change} />
        </div>
                <button type="submit">Upload</button>
      </form>
          
    </div>
  );
};

export default Test;
