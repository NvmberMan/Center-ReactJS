import React, { Component } from "react";

// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export class GamelistSkeleton extends Component {
  render(props) {
    const { slidesPerView , title = "Title List"} = this.props;


    return (
      <div className="games">
        <p className="title">{title}</p>
        <Swiper
          className="gamelist"
          spaceBetween={0}
          slidesPerView={slidesPerView ?? 3}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <SwiperSlide key={index} className="skeleton">
                <div className="display"></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}

export default GamelistSkeleton;
