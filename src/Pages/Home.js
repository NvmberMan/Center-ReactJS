import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Gamelist from "../Components/Gamelist";
import GamelistType2 from "../Components/GamelistType2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hitGetGames } from "../Api";
import xbox from "../Images/xbox.svg";
import playstation from "../Images/playstation.svg";
import windows from "../Images/windows.svg";
import ios from "../Images/ios.svg";
import android from "../Images/android.svg";
import nintendo from "../Images/nintendo.svg";
import linux from "../Images/linux.svg";
import macos from "../Images/macos.svg";
// import SteamAchievementGamelist from "../Components/SteamAchievementGamelist";

function Home() {
  const [recommendGameList, setRecommendGameList] = useState();
  const [popularGameList, setPopularGameList] = useState();
  const [multiplayerGameList, setMultiplayerGameList] = useState();
  const [singleplayerGameList, setSingleplayerGameList] = useState();
  const [fightingGameList, setFightingGameList] = useState();
  const [boardGameList, setBoardGameList] = useState();
  const [gameList, setGameList] = useState();

  const [slidesPerViewRecommend, setSlidesPerViewRecommend] = useState(2);
  const [slidesPerViewPopular, setSlidesPerViewPopular] = useState(2);
  const [slidesPerViewMultiplayerGame, setSlidesPerViewMultiplayerGame] =
    useState(6);
  const [slidesPerViewBoardGameList, setSlidesPerViewBoardGameList] =
    useState(4);

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
    //Get List Game -- for page 2
    hitGetGames(5, 12)
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setGameList(data.data.results);
        console.log(data.data.results);
      });
    //Get List Multiplayer
    hitGetGames(7, 12)
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setMultiplayerGameList(data.data.results);
      });
    //Get List Singleplayer
    hitGetGames(8, 12)
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setSingleplayerGameList(data.data.results);
      });
    //Get List BoardList
    hitGetGames(11, 4)
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setBoardGameList(data.data.results);
      });

    //Get List Fighting List
    hitGetGames(12, 4)
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setFightingGameList(data.data.results);
      });

    changeAttributeOnScreenSize();
  }, []);

  const changeAttributeOnScreenSize = () => {
    var windowWidth = window.innerWidth;
    if (windowWidth <= 442) {
      setSlidesPerViewRecommend(2);
      setSlidesPerViewPopular(2);
      setSlidesPerViewMultiplayerGame(3);
      setSlidesPerViewBoardGameList(2);
    } else if (windowWidth <= 610) {
      setSlidesPerViewRecommend(3);
      setSlidesPerViewPopular(3);
      setSlidesPerViewMultiplayerGame(4);
      setSlidesPerViewBoardGameList(2);
    } else if (windowWidth <= 768) {
      setSlidesPerViewRecommend(3);
      setSlidesPerViewPopular(3);
      setSlidesPerViewMultiplayerGame(4);
      setSlidesPerViewBoardGameList(2);
    } else if (windowWidth <= 992) {
      setSlidesPerViewRecommend(4);
      setSlidesPerViewPopular(4);
      setSlidesPerViewBoardGameList(2);
    } else if (windowWidth <= 1200) {
      setSlidesPerViewRecommend(3);
      setSlidesPerViewPopular(3);
      setSlidesPerViewMultiplayerGame(4);
      setSlidesPerViewBoardGameList(3);
    } else if (windowWidth <= 1392) {
      setSlidesPerViewMultiplayerGame(5);
      setSlidesPerViewBoardGameList(3);
    } else {
      setSlidesPerViewRecommend(3);
      setSlidesPerViewPopular(3);
      setSlidesPerViewMultiplayerGame(6);
      setSlidesPerViewBoardGameList(4);
    }

    if (windowWidth > 992) {
      document.getElementById("navbar-responsive").classList.add("hidden");
    }
  };
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

  window.onresize = changeAttributeOnScreenSize;
  window.onload = changeAttributeOnScreenSize;

  return (
    <div className="container">
      {<Navbar />}
      <div className="content padding-fixed">
        <div className="gradientTop"></div>
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
            <Gamelist
              gameData={popularGameList}
              title={"Most Popular"}
              slidesPerView={slidesPerViewPopular}
            />
            <Gamelist
              childClass={"recommend"}
              gameData={recommendGameList}
              title={"Recommend For You"}
              slidesPerView={slidesPerViewRecommend}
            />
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
          <Gamelist
            gameData={multiplayerGameList}
            title={"Multiplayer Game"}
            slidesPerView={slidesPerViewMultiplayerGame}
          />
          <Gamelist
            childClass={"recommend"}
            gameData={singleplayerGameList}
            title={"Singleplayer"}
            slidesPerView={slidesPerViewMultiplayerGame}
          />
        </div>

        <div className="page5">
          <GamelistType2
            gameData={fightingGameList}
            slidesPerView={slidesPerViewBoardGameList}
            title={"More Recommend For You"}
          />
          <GamelistType2
            gameData={boardGameList}
            slidesPerView={slidesPerViewBoardGameList}
            title={"Comming Soon"}
          />
        </div>
      </div>
      {<Footer />}
    </div>
  );
}

export default Home;
