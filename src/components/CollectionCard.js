import { Link } from "react-router-dom";

export default function CollectionCard({ collection }) {
  return (
    <div
      className="flex flex-col justify-center items-center card bg-cover bg-center relative border"
      style={{
        backgroundImage: "url('wildwest.png')",
        height: "85vh",
        width: "60vw",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-xl text-brand-light font-extrabold">
          {collection}
        </h1>
        <Link className="text-brand-light underline hover:text-brand-dark">
          Shop the collection.
        </Link>
      </div>
      <p></p>
    </div>
  );
}
