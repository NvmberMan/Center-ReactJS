import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Gamelist from "../Components/Gamelist";
// import GamelistType2 from "../Components/GamelistType2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hitGetGames } from "../Api";
import GamelistSkeleton from "../Components/GamelistSkeleton";
import xbox from "../Images/xbox.svg";
import playstation from "../Images/playstation.svg";
import windows from "../Images/windows.svg";
import ios from "../Images/ios.svg";
import android from "../Images/android.svg";
import nintendo from "../Images/nintendo.svg";
import linux from "../Images/linux.svg";
import macos from "../Images/macos.svg";

function Home() {
  const [recommendGameList, setRecommendGameList] = useState();
  const [popularGameList, setPopularGameList] = useState();
  const [gameList, setGameList] = useState();

  const [slidesPerViewRecommend, setSlidesPerViewRecommend] = useState(3);
  const [slidesPerViewPopular, setSlidesPerViewPopular] = useState(3);

  useEffect(() => {
    //Get Recommend Game
    hitGetGames(1, 10)
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setRecommendGameList(data.data.results);
      });
    //Get Favorite Game
    hitGetGames(4, 10)
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setPopularGameList(data.data.results);
      });
    //Get List Game
    hitGetGames(5, 12)
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setGameList(data.data.results);
        console.log(data.data.results);
      });
  }, []);

  function changeAttributeOnScreenSize() {
    var windowWidth = window.innerWidth;
    if (windowWidth <= 992) {
      setSlidesPerViewRecommend(4);
      setSlidesPerViewPopular(4);
    }
    if (windowWidth <= 868) {
      setSlidesPerViewRecommend(3);
      setSlidesPerViewPopular(3);
    }
    if (windowWidth <= 442) {
      setSlidesPerViewRecommend(2);
      setSlidesPerViewPopular(2);
    } else {
      setSlidesPerViewRecommend(3);
      setSlidesPerViewPopular(3);
    }
  }

  window.onload = changeAttributeOnScreenSize;
  window.onresize = changeAttributeOnScreenSize;

  const getPlatformImage = (platform) => {
    if (platform === "PC") {
      return windows;
    } else if (platform === "Linux") {
      return linux;
    } else if (platform === "macOS") {
      return macos;
    } else if (platform === "Xbox One" || platform === "Xbox") {
      return xbox;
    } else if (platform === "Nintendo Switch") {
      return nintendo;
    } else if (platform === "PlayStation 4" || platform === "PlayStation") {
      return playstation;
    } else if (platform === "Android") {
      return android;
    } else if (platform === "iOS") {
      return ios;
    } else {
      return "path/to/default-image.png";
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="gradientTop"></div>
        {<Navbar />}
        <div className="page1">
          <div className="leftside">
            <img
              src="https://m.media-amazon.com/images/I/91cFzvxFGyS._AC_UF1000,1000_QL80_.jpg"
              className="display-1"
              alt=""
            />
            <img
              src="https://images-cdn.ubuy.co.id/64dc67ad3ddf32761e7a9ddd-call-of-duty-modern-warfare-2-key-art.jpg"
              className="display-2"
              alt=""
            />
          </div>
          <div className="rightside">
            {popularGameList && popularGameList.length > 0 ? (
              <Gamelist
                gameData={popularGameList}
                title={"Most Popular"}
                slidesPerView={slidesPerViewPopular}
              />
            ) : (
              <GamelistSkeleton
                title={"Most Popular"}
                slidesPerView={slidesPerViewPopular}
              />
            )}
            {recommendGameList && recommendGameList.length > 0 ? (
              <Gamelist
                childClass={"recommend"}
                gameData={recommendGameList}
                title={"Recommend For You"}
                slidesPerView={slidesPerViewRecommend}
              />
            ) : (
              <GamelistSkeleton
                title={"Recommend For You"}
                slidesPerView={slidesPerViewRecommend}
              />
            )}
          </div>
        </div>

        <div className="page2">
          <p className="title">All Games</p>
          <div className="gamegrid">
            {gameList
              ? gameList.map((item, index) => (
                  <div key={index} className={`box box-${index}`}>
                    <div className="data">
                      <p>{item.name}</p>
                      <div className="platforms">
                        {item.platforms.map((row, i) => (
                          <img
                            key={i}
                            src={getPlatformImage(row.platform.name)}
                            alt=""
                          />
                        ))}
                      </div>
                    </div>
                    <img
                      src={item.background_image}
                      className="display"
                      alt=""
                    />
                  </div>
                ))
              : Array.from({ length: 12 }).map((row, i) => (
                  <div className={`box box-${i} box-skeleton`} key={i}>
                    <div className="display"></div>
                  </div>
                ))}
          </div>
        </div>

        <div className="page3">
          {/* {<Gamelist slidesPerView={5} />} */}
          {/* {<Gamelist slidesPerView={5} />} */}
        </div>

        {/* <div className="page4">
          <div className="background"></div>
          <div className="data">
            <p className="title">STEAM ACHIEVEMENT</p>
            <div className="row">
              <div className="side left-side">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="box">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
                      alt=""
                    />
                    <p>Grand Theft Auto V</p>
                  </div>
                ))}
              </div>
              <img
                className="trailer"
                src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
                alt=""
              />
              <div className="side right-side">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="box">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
                      alt=""
                    />
                    <p>Grand Theft Auto V</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}

        <div className="page5">
          {/* <GamelistType2 /> */}
          {/* <GamelistType2 /> */}
        </div>

        {<Footer />}
      </div>
    </div>
  );
}

export default Home;
