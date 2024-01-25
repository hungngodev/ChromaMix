import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { BiZoomIn } from "react-icons/bi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { buttonVariants } from "../utils/Variants";
import { MdContentCopy } from "react-icons/md";
import { WiMoonAltThirdQuarter } from "react-icons/wi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaletteCard = (props) => {
  function copyColor(color) {
    navigator.clipboard.writeText(color);
    toast.success(`${color} copied`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="palette-box">
      <div className="palette">
        {props.data.colors.map((color, index) => {
          return (
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              key={index}
              className="palette-color"
              style={{ backgroundColor: color }}
            >
              <div className="color-code">
                {color.substring(1, 7).toUpperCase()}
              </div>
              <div className="icons">
                <Link to={`/tint-and-shade-generator/${color.slice(1, 7)}`}>
                  <WiMoonAltThirdQuarter size={18} className="tintshade" />
                </Link>
                <MdContentCopy
                  className="copy"
                  size={18}
                  onClick={() => copyColor(color)}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="palette-bottom">
        <button>
          <FaRegHeart size={15} /> <p>{props.data.likes}</p>
        </button>
        <Link to={`/palette/${props.data.id}`}>
          <button className="more-info">
            <BiZoomIn className="more-info" size={16} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaletteCard;
