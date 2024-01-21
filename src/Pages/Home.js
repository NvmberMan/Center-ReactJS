import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Gamelist from "../Components/Gamelist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className="container">
      <div className="content">
        {<Navbar />}
        <div className="page1">
          <div className="leftside">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
              className="display-1"
              alt=""
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
              className="display-2"
              alt=""
            />
          </div>
          <div className="rightside">
            {/* <div className="games">
              <p className="title">Most Review</p>
              <div className="gamelist">
                <div className="box">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
                    alt=""
                  />
                  <p>Grand Theft Auto V</p>
                </div>
                <div className="box">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
                    alt=""
                  />
                  <p>Grand Theft Auto V</p>
                </div>
              </div>
            </div> */}
            {<Gamelist />}
            {<Gamelist />}
          </div>
        </div>

        <div className="page2">
          <p className="title">All Games</p>
          <div className="gamegrid">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="box">
                <div className="data">
                  <p>Grand Theft Auto V</p>
                  <div className="platforms">
                    <FontAwesomeIcon className="icon" icon={faWindowMaximize} />
                    <FontAwesomeIcon className="icon" icon={faWindowClose} />
                  </div>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
                  className="display"
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="small-button">Load More</div>
        </div>

        <div className="page3">
          {<Gamelist slidesPerView={5} />}
          {<Gamelist slidesPerView={5} />}
        </div>

        <div className="page4">
          <div className="background"></div>
          <div className="data">
            <p className="title">STEAM ACHIEVEMENT</p>
            <div className="row">
              <div className="side left-side">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <img className="trailer" src="" alt="" />
              <div className="side right-side">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
            </div>
          </div>
        </div>
        {<Footer />}
      </div>
    </div>
  );
}

export default Home;
