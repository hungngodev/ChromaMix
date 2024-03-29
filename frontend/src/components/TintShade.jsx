import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import isHexcolor from "is-hexcolor";
import Values from "values.js";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import Hero from "./Hero";
import "react-toastify/dist/ReactToastify.css";
import Loader2 from "./Loader2";

function copyColor(color) {
  const rgbToHex = (rgb) =>
    "#" +
    rgb
      .match(/\d+/g)
      .map(Number)
      .map((val) =>
        Math.min(255, Math.max(0, val)).toString(16).padStart(2, "0")
      )
      .join("");
  color = rgbToHex(color);
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

// tint box component
const TintColor = ({ rgb, weight }) => {
  return (
    <div
      className="tint-color"
      style={{ backgroundColor: `${rgb}`, border: "2px solid black" }}
    >
      <MdContentCopy
        className="copy-icon"
        size={24}
        onClick={() => copyColor(rgb)}
      />
      <div className="data">weight: {weight}</div>
    </div>
  );
};

// shade box component
const ShadeColor = ({ rgb, weight }) => {
  return (
    <div
      className="shade-color"
      style={{ backgroundColor: `${rgb}`, border: "2px solid black" }}
    >
      <MdContentCopy
        className="copy-icon"
        size={24}
        onClick={() => copyColor(rgb)}
      />
      <div className="data">weight: {weight}</div>
    </div>
  );
};

const Tint = () => {
  const colorHex = useParams().colorHex;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const [tintNumber, setTintNumber] = useState(24);
  const [shadeNumber, setShadeNumber] = useState(24);
  const [color, setColor] = useState(`#${colorHex}`);
  const [inputColor, setInputColor] = useState(`#${colorHex}`);
  const [tintList, setTintList] = useState(
    new Values(color).tints(Math.floor(100 / tintNumber))
  );
  const [shadeList, setShadeList] = useState(
    new Values(color).shades(Math.floor(100 / shadeNumber))
  );

  const handleTintShade = (e) => {
    e.preventDefault();
    setTintList(new Values(color).tints(Math.floor(100 / tintNumber)));
    setShadeList(new Values(color).shades(Math.floor(100 / shadeNumber)));
  };

  useEffect(() => {
    setTintList(new Values(color).tints(Math.floor(100 / tintNumber)));
    setShadeList(new Values(color).shades(Math.floor(100 / shadeNumber)));
  }, [tintNumber, shadeNumber, color]);

  const inputHexCodeHandleChange = (e) => {
    let color = e.target.value;
    if (
      (isHexcolor(color) && color.length === 7) ||
      color === "#000" ||
      color === "#fff"
    ) {
      e.target.style.border = "1px solid green";
      setColor(color);
    } else {
      e.target.style.border = "1px solid red";
    }
    setInputColor(color);
  };

  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <div className="tint-shade-container">
          <Hero
            heading={"Tint and Shade Generator"}
            para1={"Generate color shades online."}
            para2={
              "Enter Hex code or pick color and get different tint and shades"
            }
          />

          <form onSubmit={handleTintShade}>
            <input
              type="color"
              className="input-color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                setInputColor(e.target.value);
              }}
            />
            <input
              type="text"
              value={inputColor}
              onChange={inputHexCodeHandleChange}
              className="input-text"
            />
            {/* <input type="submit" value="Submit" className="input-btn" /> */}
          </form>

          <form className="set-tint-shade-count">
            <div className="tint-count">
              <label htmlFor="">
                Set number of <span style={{ color: color }}>Tint</span> Colors
              </label>
              <div
                onClick={() => {
                  setTintNumber(tintNumber + 1 > 100 ? 100 : tintNumber + 1);
                }}
                className="add-btn"
              >
                <FaPlus />
              </div>
              <input
                type="number"
                min="1"
                max="100"
                value={tintNumber}
                onChange={(e) => setTintNumber(e.target.value)}
                className="input-number"
              />
              <div
                onClick={() => {
                  setTintNumber(tintNumber - 1 < 0 ? 0 : tintNumber - 1);
                }}
                className="add-btn"
              >
                <FaMinus />
              </div>
            </div>
            <div className="shade-count">
              <label htmlFor="">
                Set number of <span style={{ color: color }}>Shade</span> Colors
              </label>
              <div
                onClick={() => {
                  setShadeNumber(shadeNumber + 1 > 100 ? 100 : shadeNumber + 1);
                }}
                className="add-btn"
              >
                <FaPlus />
              </div>
              <input
                type="number"
                min="1"
                max="100"
                value={shadeNumber}
                onChange={(e) => setShadeNumber(e.target.value)}
                className="input-number"
              />
              <div
                onClick={() => {
                  setShadeNumber(shadeNumber - 1 < 0 ? 0 : shadeNumber - 1);
                }}
                className="add-btn"
              >
                <FaMinus />
              </div>
            </div>
          </form>

          <div className="container">
            <div className="title">
              <h1>Tints</h1>
            </div>
            <div className="tint-color-box">
              {tintList.slice(0, tintNumber).map((colorObj, index) => {
                const rgb = `rgb(${colorObj.rgb[0]}, ${colorObj.rgb[1]}, ${colorObj.rgb[2]})`;
                const weight = colorObj.weight;

                return <TintColor key={index} rgb={rgb} weight={weight} />;
              })}
            </div>
            <div className="title">
              <h1>Shades</h1>
            </div>
            <div className="shade-color-box">
              {shadeList.slice(0, shadeNumber).map((colorObj, index) => {
                const rgb = `rgb(${colorObj.rgb[0]}, ${colorObj.rgb[1]}, ${colorObj.rgb[2]})`;
                const weight = colorObj.weight;

                return <ShadeColor key={index} rgb={rgb} weight={weight} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tint;
