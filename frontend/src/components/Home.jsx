import React, { useState, useEffect } from "react";
import { AiOutlineUndo } from "react-icons/ai";
import { motion } from "framer-motion";

import Hero from "./Hero";
import PaletteCard from "./PaletteCard";
import ColorPaletteData from "../data/ColorData";
import { containerVariants } from "../utils/Variants";
import Loader from "./Loader";

const Home = () => {
  const [visibleItems, setVisibleItems] = useState(16);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const loadmore = () => {
    setVisibleItems((prev) => prev + 4);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <Hero
            heading={"Welcome to ChromaMix"}
            para1={"Here is collection of 1000+ color palettes."}
            para2={
              "Pick your perfect color palette for your next dream project."
            }
          />

          <motion.div
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {ColorPaletteData.slice(0, visibleItems).map((colorPalette) => {
              return (
                <PaletteCard
                  key={colorPalette.id}
                  data={colorPalette}
                  className="palette-box"
                />
              );
            })}
          </motion.div>

          {ColorPaletteData.length >= visibleItems && (
            <button onClick={loadmore} className="load-more-btn">
              Load More <AiOutlineUndo size={20} color={"#555"} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
