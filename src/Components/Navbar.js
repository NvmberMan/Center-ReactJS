import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faGlobe,
  faMoon,
  faSearch,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
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
    if (themeToogle) setDarkMode();
    else setLightkMode();
  };

  const toogleNavbar = () => {
    const navbarResponsive = document.getElementById("navbar-responsive");
    if(navbarResponsive.classList.contains("hidden"))
    {
      navbarResponsive.classList.remove("hidden");
    }else
    {
      navbarResponsive.classList.add("hidden");
    }
  }

  return (
    <div>
      <div className="navbar">
        <div className="content">
          <h1 className="title" onClick={() => navigate("/")}>CENTRAL</h1>
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
            <FontAwesomeIcon className="icon" icon={faSearch} />
            <FontAwesomeIcon
              id="toggleThemeId"
              className="icon"
              icon={themeToogle ? faMoon : faSun}
              onClick={toggleTheme}
            />
            <FontAwesomeIcon className="icon" icon={faGlobe} />
            <li>YOUR ACCOUNT</li>
            <FontAwesomeIcon className="icon humberger" onClick={toogleNavbar} icon={faBars} />
          </ul>
        </div>
      </div>
      <div className="navbar-responsive hidden" id="navbar-responsive">
        <div className="content">
          <div className="navbar-top">
            <div className="account">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <p>YOUR ACCOUNT</p>
            </div>
            <FontAwesomeIcon
              id="toggleThemeId"
              className="icon"
              icon={themeToogle ? faMoon : faSun}
              onClick={toggleTheme}
            />
            <FontAwesomeIcon className="icon" icon={faGlobe} />
          </div>
          <ul className="navbar-bottom">
            <li className="selected">
              <a href="/">All Games</a>
              <FontAwesomeIcon className="icon" icon={faAngleDown} />
            </li>
            <li>Wishlist</li>
            <li>Support</li>
          </ul>

          <div className="search-container">
            <input type="text" placeholder="Search Game" />
          </div>
        </div>
      </div>
    </div>
  );
}
