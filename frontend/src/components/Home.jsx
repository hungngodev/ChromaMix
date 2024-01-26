import React, { useState, useEffect,useRef } from "react";
import { AiOutlineUndo } from "react-icons/ai";
import { MdExpandLess } from "react-icons/md";
import { motion } from "framer-motion";

import Hero from "./Hero";
import PaletteCard from "./PaletteCard";
import ColorPaletteData from "../data/ColorData";
import { containerVariants } from "../utils/Variants";
import Loader from "./Loader";

const Home = () => {
  const [visibleItems, setVisibleItems] = useState(16);
  const [loading, setLoading] = useState(true);
  const LoadButtonRef = useRef(null);

  const onmouseclick= function (e) {
    const y1 = JSON.parse(localStorage.getItem("y"));
    console.log(y1);
    var y = e.pageY;
    localStorage.setItem("y", JSON.stringify(y));
  };

  useEffect(() => {
    const currentItems = JSON.parse(localStorage.getItem("visibleItems"));
    setVisibleItems(currentItems);
    window.addEventListener('click', onmouseclick);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const y = JSON.parse(localStorage.getItem("y"));
    window.scrollTo(0, y-850);
  });

  useEffect(() => {
    LoadButtonRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(window.innerHeight)
    localStorage.setItem("visibleItems", JSON.stringify(visibleItems));
  }, [visibleItems]);

  const loadmore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const loadless = () => {
    setVisibleItems((prev) => prev - 10);
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
            {ColorPaletteData.slice(0, visibleItems).map((colorPalette, index) => {
              return (
                <div className= "palette-container">
                    <h1>{index}</h1>
                <PaletteCard
                  key={colorPalette.id}
                  data={colorPalette}
                  className="palette-box"
                />
                </div>
              );
            })}
          </motion.div>
          <div className="adjust">
            {ColorPaletteData.length >= visibleItems && visibleItems >= 10 && (
              <button onClick={loadless} ref = {LoadButtonRef} className="load-btn">
                Show Less <MdExpandLess size={20} color={"#555"} />
              </button>
            )}
            {ColorPaletteData.length >= visibleItems && (
              <button onClick={loadmore} ref = {LoadButtonRef} className="load-btn">
                Load More <AiOutlineUndo size={20} color={"#555"} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
