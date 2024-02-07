import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../StylistComponent/allgame.css";
import { useEffect } from "react";
import { getAllGames, getPaginationAllGames } from "../ApiManager";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function AllGames() {
  const [data, setData] = useState({ loading: true });

  useEffect(() => {
    const fetchData = async () => {
      setData(await getAllGames());
    };
    fetchData();
  }, []);

  const getMoreGames = () => {
    if (!data) return;

    const url = data.next;

    const fetchData = async () => {
      setData((prev) => ({
        ...prev,
        loading: true,
      }));

      getPaginationAllGames(url)
        .then((response) => {
          // Setelah mendapatkan data, memperbarui state dan loading menjadi false
          setData((prev) => ({
            ...prev,
            next: response.next,
            results: [...prev.results, ...response.results],
            loading: false,
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Jika terjadi kesalahan, set loading menjadi false
          setData((prev) => ({
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

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };


  return (
    <div>
      <div className="container allgame">
        <Navbar />
        <div className="content">
          <div className="filter">
            <div className="bar">
              <p>Show All</p>
              <FontAwesomeIcon className="icon" icon={faAngleDown} />
            </div>
            <div className="bar">
              <p>Platform</p>
              <FontAwesomeIcon className="icon" icon={faAngleDown} />
            </div>
            <div className="bar">
              <p>Genre</p>
              <FontAwesomeIcon className="icon" icon={faAngleDown} />
            </div>
            <div className="bar search">
              <input type="search" placeholder="Keyword" />
            </div>
          </div>
          {data.results ? (
            <InfiniteScroll
              dataLength={data.results.length}
              next={getMoreGames}
              hasMore={!!data.next}
              loader={
                <React.Fragment>
                  {Array.from({ length: 15 }).map((_, index) => (
                    <div className="game hide-bg" key={index}>
                      <div className="img skeleton"></div>
                      <div className="name skeleton"></div>
                    </div>
                  ))}
                </React.Fragment>
              }
              className="list"
              scrollableTarget="list"
            >
              {
                data.results.map((item, index) => (
                  <div className="game" key={index} onClick={() => goToDetail(item.slug)}>
                    <img className="img" src={item.background_image} alt="" />
                    <p className="name">{truncateText(item.name, 35)}</p>
                  </div>
                ))
              }
            </InfiniteScroll>
          ) : (
            <div className="list">
              {Array.from({ length: 15 }).map((_, index) => (
                <div className="game hide-bg" key={index}>
                  <div className="img skeleton"></div>
                  <div className="name skeleton"></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AllGames;
