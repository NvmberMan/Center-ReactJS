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

    return (
      <div>
        {gameData && gameData.length > 0 ? (
          <div className="type2">
            <p className="title">{title}</p>
            <Swiper
              className="gamelist fix"
              spaceBetween={0}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {gameData &&
                Array.from({ length: slidesPerView }).map((item, index) => (
                  <SwiperSlide key={index} className="box">
                    <img src={gameData[index].background_image} alt="" className="display" />
                    <div className="title">{truncateText(gameData[index].name, 20)}</div>
                    <div className="description">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptates rem commodi repellat soluta, autem quia dolor eligendi distinctio exercitationem nihil omnis. Sed eligendi labore ullam ad magnam mollitia sit.", 60)}</div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        ) : (
          <div className="type2">
            <p className="title">{title}</p>
            <Swiper
              className="gamelist"
              spaceBetween={0}
              slidesPerView={this.props.slidesPerView ?? 3}
              loop={true}
              autoplay={{
                delay: 2500,
              }}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {Array.from({ length: slidesPerView }).map((_, index) => (
                <SwiperSlide key={index} className="skeleton">
                  <div className="display"></div>
                  <div className="title"></div>
                  <div className="description"></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    );
  }
}

export default Gamelist;
