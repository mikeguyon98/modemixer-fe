import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { AnimatePresence, motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Close";
import { deleteItem } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ItemCard({ item }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const { title } = useParams();
  const [hoverDelete, setHoverDelete] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent navigation
    if (window.confirm("Are you sure you want to delete this collection?")) {
      try {
        await deleteItem(item.id);

        toast.success("Collection deleted successfully.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });

        // Reload the page after successful deletion
        window.location.reload();
      } catch (error) {
        console.error("Error deleting collection:", error);
        toast.error("Failed to delete collection.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  const nextImage = () => {
    setActive((prev) => (prev + 1) % item.image_urls.length);
  };

  const prevImage = () => {
    setActive(
      (prev) => (prev - 1 + item.image_urls.length) % item.image_urls.length
    );
  };

  return (
    <div
      className="relative mt-8 max-h-[345px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/collections/${title}/${item.collection}/${item.id}`}>
        <motion.div
          className="relative overflow-hidden h-[300px] w-[300px] bg-slate-400 rounded-xl flex justify-center items-center"
          onHoverStart={() => setShowOverlay(true)}
          onHoverEnd={() => setShowOverlay(false)}
          onClick={() => setOnClick(!onClick)}
        >
          <AnimatePresence>
            {(showOverlay || onClick) && (
              <>
                <motion.div
                  className="absolute top-0 right-0 z-10 p-2"
                  initial={{ opacity: 2 }}
                  animate={{ opacity: 2 }}
                  whileHover={{ scale: 1.1 }}
                  onHoverStart={() => setHoverDelete(true)}
                  onHoverEnd={() => setHoverDelete(false)}
                  onClick={handleDelete}
                  title="Click to delete collection"
                >
                  <DeleteIcon style={{ fill: hoverDelete ? "red" : "white" }} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 z-5 flex justify-center items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />
                  <motion.h1
                    className="bg-white text-brand-dark font-semibold text-sm z-5 px-3 py-2 rounded-full flex items-center gap-[.5ch] hover:opacity-75 hover:cursor-pointer"
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    exit={{ y: 10 }}
                  >
                    <p>Item details</p>
                    <ArrowCircleRightIcon />
                  </motion.h1>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <img
            src={item.image_urls[active]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </Link>
      {hover && (
        <div
          className="rounded-2xl hover:opacity-75"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "75%",
            width: "35%",
            height: "8%",
            background: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px 18px",
            zIndex: 10,
          }}
        >
          <button
            onClick={prevImage}
            className="text-black "
            style={{
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ←
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0px 14px",
              marginTop: "10px",
            }}
          >
            {item.image_urls.map((_, index) => (
              <span
                key={index}
                style={{
                  padding: "0px 2px",
                  cursor: "pointer",
                  color: active === index ? "black" : "gray",
                  fontSize: "18px",
                }}
              >
                •
              </span>
            ))}
          </div>
          <button
            onClick={nextImage}
            className="text-black "
            style={{
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            →
          </button>
        </div>
      )}

      <Link
        to={`/collections/${title}/${item.collection}/${item.id}`}
        onClick={() => [item]}
      >
        <div className="flex mt-5 justify-center">
          <span
            className="hover:text-blue-300 max-w-[80%] font-bold text-brand-dark hover:cursor-pointer"
            style={{
              fontSize: "1.05rem",
            }}
          >
            {item.title.length > 26
              ? `${item.title.substring(0, 22)}...`
              : item.title}{" "}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default ItemCard;
