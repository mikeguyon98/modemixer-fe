import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemDetailsPanel from "../components/ItemDetailsPanel";
import { get_item_by_id } from "../api";

export default function ItemDetails() {
  const { item_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [active, setActive] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [gender, setGender] = useState(false);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemData = await get_item_by_id(item_id);
        setData(itemData);
        setActive(itemData.image_urls[0]);
        setItemTitle(itemData.title);
        setItemDescription(itemData.description);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
        navigate("/collections");
      }
    };

    fetchItemDetails();
  }, [item_id, navigate]);

  const updateText = (newTitle, newDescription) => {
    setItemTitle(newTitle);
    setItemDescription(newDescription);
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading item details...</p>
      </div>
    );
  }

  const { image_urls } = data;

  return (
    <div className="flex flex-col ml-24 mx-auto">
      <div className="flex justify-start">
        <div className="flex flex-col items-center p-12">
          <img
            className="h-[600px] w-[500px] object-contain object-center"
            src={active}
            alt=""
          />
          <div
            className="grid grid-cols-3 gap-2 mt-4"
            style={{
              maxWidth: "480px",
            }}
          >
            {image_urls.map((imgelink, index) => (
              <div key={index} className="cursor-pointer">
                <img
                  onClick={() => setActive(imgelink)}
                  src={imgelink}
                  className="h-32 w-full rounded-lg object-cover object-center"
                  alt="gallery"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="leading-relaxed max-w-md mt-20 ml-20">
          <ItemDetailsPanel
            title={itemTitle}
            description={itemDescription}
            onUpdate={updateText}
            gender={gender}
            setGender={setGender}
          />
        </div>
      </div>
    </div>
  );
}
