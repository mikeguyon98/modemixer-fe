import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { get_collections } from "../api";
import { Pagination } from "../components/Pagination";

function Collections() {
  const [collections, setCollections] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const currentYear = new Date().getFullYear();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const limit = 12;
    const offset = (page - 1) * limit;
    get_collections(limit, offset).then((data) => {
      setCollections(data.collections);
      setTotalPages(Math.ceil(data.total_collections / limit)); // Assume `data.total` provides total collection count
    });
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="font-extrabold text-3xl text-brand mt-10 uppercase">
          {currentYear} Collection
        </h1>
        <div className="grid grid-cols-1 w-fit md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-10">
          {collections?.map((collection, index) => (
            <Card
              key={index}
              image={collection["image_url"]}
              collectionId={collection.id}
              title={collection.name}
            />
          ))}
        </div>
        <div className="mt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Collections;
