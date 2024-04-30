import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { get_items } from "../api";
import { useParams } from "react-router-dom";

// 662b31cf5fc4cf831890442d

export default function Items() {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  console.log(id);

  useEffect(
    function () {
      async function fetchItems() {
        try {
          const res = await get_items();
          console.log(res.map((cur) => cur.collection));
          const filtered = res.filter((cur) => cur["collection"] === `${id}`);
          // const filtered = res.filter(
          //   (cur) => cur["collection"] === "662b31cf5fc4cf831890442d"
          // );
          setItems(filtered);
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
    <div className="flex flex-row flex-wrap justify-center p-10 gap-10 mt-10">
      {items?.map((item) => (
        <ItemCard item={item} key={item.created_at} />
      ))}
    </div>
  );
}
