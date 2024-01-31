import React, { Component } from "react";
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
      slidesPerView = 2,
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
          <div className={`games ${childClass}`}>
            <p className="title">{title}</p>
            <Swiper
              className="gamelist"
              spaceBetween={0}
              slidesPerView={slidesPerView ?? 3}
              loop={gameData.length > 0 ? true : false}
              autoplay={{
                delay: 2500,
              }}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {gameData &&
                gameData.map((item, index) => (
                  <SwiperSlide key={index} className="box" onClick={() => goToDetail(item.slug)}>
                    <img
                      src={item.background_image}
                      alt=""
                      className="display"
                    />
                    <p>{truncateText(item.name, 18)}</p>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        ) : (
          <div className="games">
            <p className="title">{title}</p>
            <Swiper
              className="gamelist"
              spaceBetween={0}
              slidesPerView={slidesPerView}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {Array.from({ length: slidesPerView }).map((_, index) => (
                <SwiperSlide key={index} className="skeleton">
                  <div className="display"></div>
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
