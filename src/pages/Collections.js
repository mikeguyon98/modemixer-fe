import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { get_collections } from "../api";

function Collections() {
  const [collections, setCollections] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    get_collections().then((data) => {
      setCollections(data.collections);
    });
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      {" "}
      {/* Updated classes for centering */}
      <div className="flex flex-col items-center">
        {" "}
        {/* Additional wrapper for vertical centering of all content */}
        <h1 className="font-extrabold text-3xl text-brand mt-10 uppercase">
          {currentYear} Collection
        </h1>
        <div className="grid grid-cols-1 w-fit md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-10">
          {/* <h1>
            {JSON.stringify(collections)}
          </h1> */}
          {collections.map((collection, index) => (
            <Card
              key={index}
              image={collection["image_url"]}
              collectionId={collection.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;
