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
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };

    const data = [
      {
        title: "Grand Theft Auto V",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis modi nulla eos fugit recusandae incidunt nihil a cupiditate blanditiis libero, deleniti optio expedita eum ex",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
      },
      {
        title: "Grand Theft Auto V",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis modi nulla eos fugit recusandae incidunt nihil a cupiditate blanditiis libero, deleniti optio expedita eum ex",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
      },
      {
        title: "Grand Theft Auto V",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis modi nulla eos fugit recusandae incidunt nihil a cupiditate blanditiis libero, deleniti optio expedita eum ex",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
      },
      {
        title: "Grand Theft Auto V",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis modi nulla eos fugit recusandae incidunt nihil a cupiditate blanditiis libero, deleniti optio expedita eum ex",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
      },
      // ... Add more data as needed
    ];

    return (
      <div className="games type2">
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
          {data.map((item, index) => (
            <SwiperSlide key={index} className="box">
              <img src={item.imageUrl} alt="" />
              <p className="title">{item.title}</p>
              <p className="description">
                {truncateText(item.description, 50)}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}

export default Gamelist;
