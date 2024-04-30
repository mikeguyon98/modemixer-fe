import React from "react";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <Link to={`/collections/${item.collection}/items`}>
      <div className="flex flex-col items-center justify-center">
        <div
          className="justify-center items-center card bg-cover bg-center relative border "
          style={{
            backgroundImage: "url('wildwest.png')",
            height: "38vh",
            width: "15vw",
          }}
        ></div>
        <div className="flex flex-col items-center justify-center mt-6 mb-12">
          <h1 className="text-xl text-brand-light font-extrabold">
            {item.title}
          </h1>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
