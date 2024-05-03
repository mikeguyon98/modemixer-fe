import React from "react";
import { useContext, useState } from "react";
import { AppStateContext } from "../App";

export default function ItemDetails() {
  const { data } = useContext(AppStateContext);
  const { title, description, image_urls } = data[0];

  const [active, setActive] = useState(image_urls[0]);

  console.log(title, description, active);

  return (
    <div className="flex flex-col ml-24 mx-auto">
      <div className="flex justify-start">
        <div className="flex flex-col items-center p-12">
          <img
            className="h-[550px] w-[480px] rounded-lg object-fill object-center"
            src={active}
            alt=""
          />
          <div
            className={`grid grid-cols-${
              image_urls.length < 5 ? image_urls.length : 5
            } gap-2 mt-4`}
            style={{
              justifyContent: image_urls.length < 5 ? "space-around" : "normal",
              maxWidth:
                image_urls.length < 5 ? `${image_urls.length * 25}%` : "480px",
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
          <h1 className="text-3xl text-">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
