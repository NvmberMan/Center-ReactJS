import React, { useEffect, useState } from "react";
import "../StylistComponent/detail.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Await, useParams } from "react-router-dom";
import Lightbox from "react-18-image-lightbox";
import {
  getDetailGame,
  getPaginationSimilar,
  getScreenshotsGame,
  getSimilarGame,
  getTrailerGame,
} from "../ApiManager";

function Detail() {
  const { slug } = useParams();
  const [isTruncated, setIsTruncated] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState(0);
  const [trailerGame, setTrailerGame] = useState([]);
  const [screenshotsGame, setScreenshotsGame] = useState();
  const [similarGame, setSimilarGame] = useState({ loading: true });
  const [detailGame, setDetailGame] = useState({
    name: "Loading",
    description: "",
    platforms: [{ platform: { name: "" } }],
    parent_platforms: [{ platform: { name: "" } }],
    developers: [{ name: "" }],
    genres: [{ name: "" }],
    stores: [],
  });

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    //Fetching all data in ApiManager.js
    const fetchData = async () => {
      setDetailGame(await getDetailGame(slug));
      setTrailerGame(await getTrailerGame(slug));
      setScreenshotsGame(await getScreenshotsGame(slug));
      setSimilarGame(await getSimilarGame());
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(screenshotsGame);
  }, [screenshotsGame]);

  const truncateOrRestoreText = (text, maxLength, truncate) => {
    if (truncate) {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    } else {
      return text;
    }
  };

  const addMoreSimilarGame = () => {
    if (!similarGame) return;

    const url = similarGame.next;

    const fetchData = async () => {
      setSimilarGame((prev) => ({
        ...prev,
        loading: true,
      }));

      getPaginationSimilar(url)
        .then((response) => {
          // Setelah mendapatkan data, memperbarui state dan loading menjadi false
          setSimilarGame((prev) => ({
            ...prev,
            results: [...prev.results, ...response.results],
            loading: false,
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Jika terjadi kesalahan, set loading menjadi false
          setSimilarGame((prev) => ({
            ...prev,
            loading: false,
          }));
        });
    };
    fetchData();
  };
  const goToDetail = (slug) => {
    window.location = "/detail/" + slug;
  };
  const toggleTruncate = () => {
    setIsTruncated((prev) => !prev);
  };
  return (
    <div className="container detail">
      {<Navbar />}
      {/* <div className="gradientTop"></div> */}
      <img
        src={detailGame.background_image}
        className="background-image"
        alt=""
      />
      <div className="content content-detail">
        <div className="detail-game">
          <div className="leftside">
            <div className="title">{detailGame.name}</div>
            <div
              className={`description ${isTruncated ? "truncated" : ""}`}
              dangerouslySetInnerHTML={{
                __html: truncateOrRestoreText(
                  detailGame.description,
                  700,
                  isTruncated
                ),
              }}
            />
            <div className="read-more" onClick={toggleTruncate}>
              {isTruncated ? "Read More" : "Read Less"}
            </div>
            <div className="list">
              <div className="bar">
                <div className="name">Platforms</div>
                <div className="fill">
                  {`${detailGame.platforms[0].platform.name}${
                    detailGame.platforms.length > 1
                      ? ", +" + (detailGame.platforms.length - 1)
                      : ""
                  }`}
                </div>
              </div>
              <div className="bar">
                <div className="name">Release date</div>
                <div className="fill">{detailGame.released}</div>
              </div>
              <div className="bar">
                <div className="name">Developer</div>
                <div className="fill">
                  {detailGame.developers.length
                    ? `${detailGame.developers[0].name}${
                        detailGame.developers.length > 1
                          ? ", +" + (detailGame.developers.length - 1)
                          : ""
                      }`
                    : "Not Found"}
                </div>
              </div>
              <div className="bar">
                <div className="name">Genres</div>
                <div className="fill">
                  {detailGame.genres.length > 1
                    ? `${detailGame.genres[0].name}${
                        detailGame.genres.length > 1
                          ? ", +" + (detailGame.genres.length - 1) + " More"
                          : ""
                      }`
                    : "Not Found"}
                </div>
              </div>
            </div>

            <div className="system-requirements">
              <div className="title">System requirements</div>
              <div className="platforms">
                {detailGame.parent_platforms.map((item, index) => (
                  <p
                    className={index === selectedPlatform ? "selected" : ""}
                    onClick={() => setSelectedPlatform(index)}
                    key={index}
                  >
                    {item.platform.name}
                  </p>
                ))}
              </div>
              <div className="requirements">
                <div className="title">Minimum:</div>
                <ul>
                  <li>OS: OS X 10.10 or later</li>
                  <li>Processor: Intel</li>
                  <li>Memory: 1 GB RAM</li>
                  <li>Graphics: OpenGL 2.1 or higher</li>
                  <li>Storage: 250 MB available space</li>
                  <li>Additional Notes: Mouse</li>
                </ul>
              </div>
              <div className="requirements">
                <div className="title">Recommend:</div>
                <ul>
                  <li>OS: OS X 10.10 or later</li>
                  <li>Processor: Intel</li>
                  <li>Memory: 1 GB RAM</li>
                  <li>Graphics: OpenGL 2.1 or higher</li>
                  <li>Storage: 250 MB available space</li>
                  <li>Additional Notes: Mouse</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rightside">
            {trailerGame.length > 0 ? (
              <video controls autoPlay muted className="main">
                <source src={trailerGame[0].data["480"]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className={`main ${
                  detailGame.background_image_additional == null &&
                  detailGame.background_image == null
                    ? "skeleton"
                    : ""
                }`}
                style={{
                  backgroundImage: `url(${
                    detailGame.background_image_additional ||
                    detailGame.background_image
                  })`,
                }}
              ></div>
            )}

            <div className="secondary">
              {screenshotsGame
                ? screenshotsGame
                    .slice(0, screenshotsGame.length > 3 && 3)
                    .map((item, index) => (
                      <img
                        key={index}
                        src={item.image}
                        alt=""
                        onClick={() => {
                          setPhotoIndex(index);
                          setIsOpen(true);
                        }}
                      />
                    ))
                : Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="skeleton"></div>
                  ))}
            </div>
            <div className="buttons">
              <div className="wishlist-button">WISHLIST</div>
              {detailGame && detailGame.stores.length > 0 ? (
                <div className="platform-sale">
                  <div className="title">Where To Buy :</div>
                  <div className="list">
                    {detailGame.stores.map((item, index) => (
                      <a
                        href={
                          item.url ? item.url : `http://${item.store.domain}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        className="box"
                      >
                        {item.store.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="more-game">
        <div className="content">
          <div className="title">MORE LIKE THIS</div>
          <div className="list">
            {similarGame.results &&
              similarGame.results.map((item, index) => (
                <div
                  onClick={() => goToDetail(item.slug)}
                  className="game"
                  key={index}
                >
                  <img src={item.background_image} alt="" />
                  <p>{item.name}</p>
                </div>
              ))}

            {similarGame.loading &&
              Array.from({ length: 8 }).map((_, index) => (
                <div className="game" key={index}>
                  <div className="img skeleton"></div>
                  <div className="name skeleton"></div>
                </div>
              ))}
          </div>
          <div className="load" onClick={() => addMoreSimilarGame()}>
            Load More
          </div>
        </div>
      </div>
      <Footer />

      {isOpen && (
        <Lightbox
          mainSrc={screenshotsGame[photoIndex].image}
          nextSrc={screenshotsGame[(photoIndex + 1) % screenshotsGame.length].image}
          prevSrc={screenshotsGame[(photoIndex + screenshotsGame.length - 1) % screenshotsGame.length].image}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + screenshotsGame.length - 1) % screenshotsGame.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % screenshotsGame.length)}
        />
      )}
    </div>
  );
}

export default Detail;
