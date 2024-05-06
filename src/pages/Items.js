import React, { useEffect, useState, useContext } from "react";
import ItemCard from "../components/ItemCard";
import { get_items } from "../api";
import { useParams } from "react-router-dom";
import { AppStateContext } from "../App";

// 662b31cf5fc4cf831890442d

export default function Items() {
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const { setData } = useContext(AppStateContext);
  const { title } = useParams();

  console.log(id);

  useEffect(
    function () {
      async function fetchItems() {
        try {
          const res = await get_items(id);
          setItems(res);
        } catch (error) {
          throw new Error(`${error}`);
        }
      }

      fetchItems();
    },
    [id]
  );

  console.log(items);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="font-extrabold text-3xl text-brand mt-10 uppercase">
          {" "}
          {`The ${title} Collection`}
        </h1>
        <div className="grid grid-cols-1 w-fit md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-10">
          {items?.map((item, index) => (
            <ItemCard item={item} key={index} setData={setData} />
          ))}
        </div>
      </div>
    </div>
  );
}
