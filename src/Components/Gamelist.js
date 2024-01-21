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
    return (
      <div className="games">
        <p className="title">Most Review</p>
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
          {Array.from({ length: 12 }).map((_, index) => (
            <SwiperSlide key={index} className="box">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
                alt=""
              />
              <p>Grand Theft Auto V</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}

export default Gamelist;
