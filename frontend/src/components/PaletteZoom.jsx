import React from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineHeart, AiOutlineUndo } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { MdContentCopy } from "react-icons/md";
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ColorPaletteData from "../data/ColorData";

const Toolbar = ({
  color,
  filterColorsArray,
  setFilterColorsArray,
  colorsArray,
  setColorsArray,
}) => {
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
    <ul className="toolbar">
      <li>
        <RxCross2
          onClick={() => {
            let result = filterColorsArray.filter(
              (data, index) => color !== data
            );
            if (result.length !== 0) {
              setFilterColorsArray(result);
              console.log(result.length);
            }
          }}
          color={"white"}
          size={50}
        />
      </li>
      <li>
        <AiOutlineUndo
          onClick={() => {
            setFilterColorsArray(colorsArray);
          }}
          color={"white"}
          size={50}
        />
      </li>
      <li>
        <Link to={`/tint-and-shade-generator/${color.slice(1, 7)}`}>
          <WiMoonAltThirdQuarter color={"white"} size={50} />
        </Link>
      </li>
      <li>
        <MdContentCopy
          onClick={() => copyColor(color)}
          color={"white"}
          size={50}
        />
      </li>
    </ul>
  );
};

const PaletteZoom = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const colorID = useParams().id;
  const colorData = ColorPaletteData.find(
    (colorPalette) => colorPalette.id === parseInt(colorID)
  );

  const [colorsArray, setColorsArray] = useState(colorData.colors);
  const [filterColorsArray, setFilterColorsArray] = useState(colorData.colors);

  return (
    <div className="palette-container">
      <p>{colorData.title}</p>
      <div className="likes">
        <AiOutlineHeart size={50} />
        <p>{colorData.likes}</p>
      </div>

      <div className="palette-zoom">
        {filterColorsArray.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            className="zoom-palette-color"
          >
            <p>{color.substring(1, 7).toUpperCase()}</p>
            <div className="options">
              <Toolbar
                color={color}
                setFilterColorsArray={setFilterColorsArray}
                filterColorsArray={filterColorsArray}
                colorsArray={colorsArray}
                setColorsArray={setColorsArray}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteZoom;
