import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { AnimatePresence, motion } from "framer-motion";

function ItemCard({ item, setData }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [onClick, setOnClick] = useState(false);

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
      className="relative h-[300px] w-[300px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        to={`/collections/${item.collection}/items`}
        onClick={() => setData([item])}
      >
        <motion.div
          className="relative overflow-hidden h-[300px] w-[300px] bg-slate-400 rounded-xl flex justify-center items-center"
          onHoverStart={() => setShowOverlay(true)}
          onHoverEnd={() => setShowOverlay(false)}
          onClick={() => setOnClick(!onClick)}
        >
          <AnimatePresence>
            {(showOverlay || onClick) && (
              <motion.div
                className="absolute inset-0 z-10 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />
                <motion.h1
                  className="bg-white text-brand-dark font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[.5ch] hover:opacity-75 hover:cursor-pointer"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  exit={{ y: 10 }}
                >
                  <p>Item details</p>
                  <ArrowCircleRightIcon />
                </motion.h1>
              </motion.div>
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
            bottom: 0,
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
            className="text-blue-900 "
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
                  color: active === index ? "blue" : "gray",
                  fontSize: "18px",
                }}
              >
                •
              </span>
            ))}
          </div>
          <button
            onClick={nextImage}
            className="text-blue-900 "
            style={{
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemCard;
