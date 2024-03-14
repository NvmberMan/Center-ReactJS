import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faGlobe,
  faMoon,
  faSearch,
  faSun,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [themeToogle, setThemeToogle] = useState([false]);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, signOut } = useAuth();
  const [accountDetail, setAccountDetail] = useState(false);
  const [translateDetail, setTranslateDetail] = useState(false);
  const menuRef = useRef();
  const translateRef = useRef();
  const menuTranslateRef = useRef();
  const accountRef = useRef();

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  };

  const toogleNavbar = () => {
    const navbarResponsive = document.getElementById("navbar-responsive");
    if (navbarResponsive.classList.contains("hidden")) {
      navbarResponsive.classList.remove("hidden");
    } else {
      navbarResponsive.classList.add("hidden");
    }
  };

  const handleRoutes = (url) => {
    window.location = url;
  };

  const handleLogout = async () => {
    await signOut();
  };

  useEffect(() => {
    // Fungsi untuk menangani perubahan scroll
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    handleScroll();
    // Tambahkan event listener saat komponen dimuat
    window.addEventListener("scroll", handleScroll);
    // Hapus event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  window.addEventListener("click", function (e) {
    if (e.target !== menuRef.current && e.target !== accountRef.current) {
      setAccountDetail(false);
    }
    if (
      e.target !== menuTranslateRef.current &&
      e.target !== translateRef.current
    ) {
      setTranslateDetail(false);
    }
  });

  const navbarClass = scrolled ? "navbar nav-scrolled" : "navbar";

  useEffect(() => {
    googleTranslateElementInit();
  }, []);
  function googleTranslateElementInit() {
    // eslint-disable-next-line no-undef
    new google.translate.TranslateElement(
      { pageLanguage: "en" },
      "google_translate_element"
    );
  }

  function changeLanguage(lang, phone) {
    var select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }

    if(phone)
    {
      closeLanguageMenu();
      toogleNavbar();
    }
  }

  

  function openLanguageMenu(){
    document.getElementById("language-menu").classList.remove("hide");

  }
  function closeLanguageMenu(){
    document.getElementById("language-menu").classList.add("hide");

  }

  return (
    <div>
      <div className={`navbar ${navbarClass}`}>
        <div className="content navbar-content">
          <div id="google_translate_element"></div>
          <div  className="c-title" onClick={() => navigate("/")}></div>
          <h1 className="title notranslate" onClick={() => navigate("/")}>
            ENTRAL
          </h1>
          <ul className="navbar-left">
            <li className="selected">
              <a href="/games">ALL GAMES</a>
              {/* <FontAwesomeIcon className="icon" icon={faAngleDown} /> */}
            </li>
            <li>
              {" "}
              <a href="/wishlist">WISHLIST</a>
            </li>
            {/* <li>SUPPORT</li> */}
          </ul>
          <div className="tools"></div>
          <ul className="navbar-right">
            {/* <FontAwesomeIcon className="icon" icon={faSearch} /> */}
            <Link>
              <div
                className="icon globe"
                ref={translateRef}
                onClick={() => setTranslateDetail(!translateDetail)}
              ></div>
            </Link>
            <li
              className="notranslate"
              onClick={() => setAccountDetail(!accountDetail)}
              ref={accountRef}
            >
              {currentUser ? (
                currentUser.email
              ) : (
                <div className="buttons">
                  <div onClick={(e) => handleRoutes("/login")} className="href">
                    SIGN IN
                  </div>
                  <p>/</p>
                  <div
                    onClick={(e) => handleRoutes("/register")}
                    className="href"
                  >
                    SIGN UP
                  </div>
                </div>
              )}
            </li>{" "}
            {/* <<-- Account Name Setting  */}
            <FontAwesomeIcon
              className="icon humberger"
              onClick={toogleNavbar}
              icon={faBars}
            />
          </ul>

          <div
            className={`account-detail ${accountDetail ? "" : "hidden"}`}
            id="account-detail"
            ref={menuRef}
          >
            <p className="title-dropdown">Your Account</p>
            <p onClick={(e) => signOut()} className="button">
              Logout
            </p>
          </div>
          <div
            className={`translate-detail ${translateDetail ? "" : "hidden"}`}
            id="translate-detail"
            ref={menuTranslateRef}
          >
            <p className="title-dropdown notranslate">Change Language</p>
            <p
              className="button notranslate"
              onClick={() => changeLanguage("en")}
            >
              English
            </p>
            <p
              className="button notranslate"
              onClick={() => changeLanguage("id")}
            >
              Indonesia
            </p>
            <p
              className="button notranslate"
              onClick={() => changeLanguage("ar")}
            >
              Arabic
            </p>
            <p
              className="button notranslate"
              onClick={() => changeLanguage("zh-CN")}
            >
              Chinesse
            </p>
            <p
              className="button notranslate"
              onClick={() => changeLanguage("ja")}
            >
              Japanese
            </p>
          </div>
        </div>
      </div>
      <div className="navbar-responsive hidden" id="navbar-responsive">
        <div className="content">
          <div className="navbar-top">
            <div className="account">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <p className="notranslate">{currentUser ? currentUser.email : ""}</p>{" "}
              {/* <<-- Account Name Setting  */}
            </div>
            <FontAwesomeIcon className="icon" onClick={() => openLanguageMenu()} icon={faGlobe} />
          </div>
          <ul className="navbar-bottom">
            <li className="selected">
              <a href="/">All Games</a>
              {/* <FontAwesomeIcon className="icon" icon={faAngleDown} /> */}
            </li>
            <li onClick={() => handleRoutes('/wishlist')}>Wishlist</li>
            {/* <li>Support</li> */}
          </ul>

          <div className="search-container">
            <button className="logoutButton">Logout</button>
          </div>
        </div>

        <div className="language-menu hide" id="language-menu">
        <FontAwesomeIcon onClick={() => closeLanguageMenu()} className="icon x-mark" icon={faXmark} />

          <h2 className="notranslate">Change Language</h2>
          <p
            className="button notranslate"
            onClick={() => changeLanguage("en", true)}
          >
            English
          </p>
          <p
            className="button notranslate"
            onClick={() => changeLanguage("id", true)}
          >
            Indonesia
          </p>
          <p
            className="button notranslate"
            onClick={() => changeLanguage("ar", true)}
          >
            Arabic
          </p>
          <p
            className="button notranslate"
            onClick={() => changeLanguage("zh-CN", true)}
          >
            Chinesse
          </p>
          <p
            className="button notranslate"
            onClick={() => changeLanguage("ja", true)}
          >
            Japanese
          </p>
        </div>
      </div>
    </div>
  );
}
