import React, { Component, useEffect } from "react";

// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export class Gamelist extends Component {
  render(props) {
    const {
      slidesPerView = 3,
      childClass = "",
      gameData = [],
      title = "Title List",
    } = this.props;

    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };

    const goToDetail = (slug) => {
      window.location = "/detail/"+ slug;
    }

    return (
      <div>
        {gameData && gameData.length > 0 ? (
          <div className="type2">
            <p className="title">{title}</p>
            <div className="gamelist">
              {gameData &&
                Array.from({ length: slidesPerView }).map((item, index) => (
                  <div key={index} className="box"  onClick={() => goToDetail(gameData[index].slug)}>
                    <img src={gameData[index].background_image} alt="" className="display" />
                    <div className="title">{truncateText(gameData[index].name, 20)}</div>
                    <div className="description">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptates rem commodi repellat soluta, autem quia dolor eligendi distinctio exercitationem nihil omnis. Sed eligendi labore ullam ad magnam mollitia sit.", 60)}</div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="type2">
            <p className="title">{title}</p>
           <div className="gamelist">
              {Array.from({ length: slidesPerView }).map((_, index) => (
                <div key={index} className="skeleton">
                  <div className="display"></div>
                  <div className="title"></div>
                  <div className="description"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Gamelist;
