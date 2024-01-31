import React, { useEffect, useState } from "react";
import "../StylistComponent/detail.css";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { hitDetailGame } from "../Api";

function Detail() {
  const { slug } = useParams();
  const [isTruncated, setIsTruncated] = useState(true);
  const [detailGame, setDetailGame] = useState({
    name: "tes",
    description: "tes",
  });

  useEffect(() => {
    hitDetailGame(slug)
      .then((data) => {
        setDetailGame(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const truncateOrRestoreText = (text, maxLength, truncate) => {
    if (truncate) {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    } else {
      return text;
    }
  };

  const toggleTruncate = () => {
    setIsTruncated((prev) => !prev);
  };
  return (
    <div className="container detail">
      {<Navbar />}
      <div className="gradientTop"></div>
      <div className="content content-detail">
        <div className="detail-game">
          <div className="leftside">
            <div className="title">{detailGame.name}</div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: truncateOrRestoreText(
                  detailGame.description,
                  500,
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
                <div className="fill">PC</div>
              </div>
              <div className="bar">
                <div className="name">Release date</div>
                <div className="fill">Dec 26, 2021</div>
              </div>
              <div className="bar">
                <div className="name">Developer</div>
                <div className="fill">Raw Zebra, Azuran_SHadow</div>
              </div>
              <div className="bar">
                <div className="name">Game</div>
                <div className="fill">Strategy, +3 More</div>
              </div>
            </div>

            <div className="system-requirements">
              <div className="title">System requirements</div>
              <div className="platforms">
                <p className="selected">PC</p>
                <p>IOS</p>
                <p>Android</p>
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
          <div className="rightside"></div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
