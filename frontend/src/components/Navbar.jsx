import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { pathVariants, svgVariants } from "../utils/Variants";

const Header = () => {
  const updateProgressBar = () => {
    const { scrollTop, scrollHeight } = document.documentElement;
    const scrollPercent =
      (scrollTop / (scrollHeight - window.innerHeight)) * 100 + "%";
    document
      .querySelector("#progress-bar")
      .style.setProperty("--progress", scrollPercent);
  };

  document.addEventListener("scroll", updateProgressBar);

  return (
    <>
      <div className="navigation">
        <nav className="header">
          <NavLink to="/">
            <motion.svg
              variants={svgVariants}
              initial="hidden"
              animate="visible"
              width="133"
              height="42"
              viewBox="0 0 135 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.g
                variants={svgVariants}
                initial="hidden"
                animate="visible"
                id="Group 1"
              >
                <motion.path
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  fill="none"
                  stroke="#008AFF"
                  d="M38 20C38 24.0159 36.7275 27.9286 34.3653 31.1762C32.003 34.4239 28.6725 36.8396 24.8518 38.0764C21.031 39.3133 16.9167 39.3077 13.0993 38.0605C9.28198 36.8133 5.95798 34.3887 3.60452 31.1346C1.25107 27.8805 -0.0108028 23.9645 6.96315e-05 19.9486C0.010942 15.9327 1.294 12.0235 3.66504 8.7822C6.03608 5.54094 9.37317 3.1343 13.1972 1.9078C17.0213 0.6813 21.1356 0.698008 24.9495 1.95553L21.5543 12.253C19.9169 11.7131 18.1505 11.7059 16.5087 12.2325C14.8669 12.7591 13.4342 13.7923 12.4162 15.1839C11.3983 16.5754 10.8474 18.2538 10.8428 19.9779C10.8381 21.7021 11.3799 23.3834 12.3903 24.7804C13.4007 26.1775 14.8278 27.2185 16.4667 27.7539C18.1056 28.2894 19.872 28.2918 21.5123 27.7607C23.1527 27.2297 24.5826 26.1926 25.5968 24.7983C26.611 23.404 27.1573 21.7242 27.1573 20H38Z"
                />
              </motion.g>
            </motion.svg>
          </NavLink>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "navlink-active" : null
                }
              >
                <h6>Home</h6>
              </NavLink>
            </li>
            {/* <li><NavLink to='/solid-color' className={({ isActive }) => (isActive ? 'navlink-active' : null)}>Solid Colors</NavLink></li> */}
            <li>
              <NavLink
                to={`/tint-and-shade-generator/${Math.random()
                  .toString(16)
                  .slice(2, 8)}`}
                className={({ isActive }) =>
                  isActive ? "navlink-active" : null
                }
              >
                <h6>Tint & Shade Generator</h6>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div id="progress-bar" />
        <div id="progress-bar2" />
        <div className="waves-container">
        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#Fff" id="whiteWaves"/>
            </g>
          </svg>
        </div>
      </div>
      </div>
  
    </>
  );
};

export default Header;
