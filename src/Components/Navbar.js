import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
  faBars,
  faGlobe,
  faMoon,
  faSearch,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const [themeToogle, setThemeToogle] = useState([false]);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const toggleTheme = (e) => {
    document.getElementById("toggleThemeHiddenId");
    setThemeToogle(!themeToogle);
    if(themeToogle) setDarkMode();
    else setLightkMode();
  };

  return (
    <div>
      <div className="navbar">
        <h1 className="title">CENTRAL</h1>
        <ul className="navbar-left">
          <li className="selected">
            <a href="/">ALL GAMES</a>
            <FontAwesomeIcon className="icon" icon={faAngleDown} />
          </li>
          <li>WISHLIST</li>
          <li>SUPPORT</li>
        </ul>
        <div className="tools"></div>
        <ul className="navbar-right">
          <FontAwesomeIcon className="icon" icon={faSearch}  />
          <FontAwesomeIcon id="toggleThemeId" className="icon" icon={themeToogle ? faMoon : faSun} onClick={toggleTheme}/>
          <FontAwesomeIcon className="icon" icon={faGlobe} />
          <li>YOUR ACCOUNT</li>
          <FontAwesomeIcon className="icon humberger" icon={faBars} />

        </ul>
      </div>
    </div>
  );
}
