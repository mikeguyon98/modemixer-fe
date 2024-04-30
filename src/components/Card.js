import React, { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

function Card({ image, collectionId }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [onClick, setOnClick] = useState(false);
  return (
    <Link to={`${collectionId}?`}>
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
                <Link to={`${collectionId}?`}>Shop the collection</Link>
                <ArrowCircleRightIcon />
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
        <img src={image} alt={image} className="w-full h-full object-cover" />
      </motion.div>
    </Link>
  );
}

export default Card;
