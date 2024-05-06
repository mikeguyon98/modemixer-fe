import React from "react";
import { useContext, useState } from "react";
import { AppStateContext } from "../App";
import ItemDetailsPanel from "../components/ItemDetailsPanel";

export default function ItemDetails() {
  const { data } = useContext(AppStateContext);
  const { title, description, image_urls, womanswear } = data[0];
  const [active, setActive] = useState(image_urls[0]);

  const [itemTitle, setItemTitle] = useState(title);
  const [itemDescription, setItemDescription] = useState(description);
  const [gender, setGender] = useState(false);

  const updateText = (newTitle, newDescription) => {
    setItemTitle(newTitle);
    setItemDescription(newDescription);
  };

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
