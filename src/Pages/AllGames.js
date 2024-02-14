import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../StylistComponent/allgame.css";
import { useEffect } from "react";
import { getAllGames, getGenres, getPaginationAllGames } from "../ApiManager";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "use-debounce";

function AllGames() {
  const [data, setData] = useState({ loading: true, results:[] });
  const [selectedGenres, setSelectedGenres] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState("");
  const [selectedSearch, setSearch] = useState();

  const [debouncedValue] = useDebounce(selectedSearch, 500)

  const [filterData, setFilterData] = useState({
    genres: [
      { name: "Genres", slug:""},
      { name: "Action", slug: "action" },
      { name: "Indie", slug: "indie" },
      { name: "Adventure", slug: "adventure" },
      { name: "RPG", slug: "role-playing-games-rpg" },
      { name: "Strategy", slug: "strategy" },
      { name: "Shooter", slug: "shooter" },
      { name: "Casual", slug: "casual" },
      { name: "Simulation", slug: "simulation" },
      { name: "Puzzle", slug: "puzzle" },
      { name: "Arcade", slug: "arcade" },
      { name: "Platformer", slug: "platformer" },
      { name: "Racing", slug: "racing" },
      { name: "Massively Multiplayer", slug: "massively-multiplayer" },
      { name: "Sports", slug: "sports" },
      { name: "Fighting", slug: "fighting" },
      { name: "Family", slug: "family" },
      { name: "Board Games", slug: "board-games" },
      { name: "Educational", slug: "educational" },
      { name: "Card", slug: "card" },
    ],
    platforms:[
      { id: 1, name: "Platforms", slug: "" },
      { id: 4, name: "PC", slug: "pc" },
      { id: 5, name: "PlayStation", slug: "playstation" },
      { id: 6, name: "Xbox", slug: "xbox" },
      { id: 7, name: "iOS", slug: "ios" },
      { id: 8, name: "Android", slug: "android" },
      { id: 9, name: "Apple Macintosh", slug: "mac" },
      { id: 10, name: "Linux", slug: "linux" },
      { id: 11, name: "Nintendo", slug: "nintendo" },
      { id: 12, name: "Atari", slug: "atari" },
      { id: 13, name: "Commodore / Amiga", slug: "commodore-amiga" },
      { id: 14, name: "SEGA", slug: "sega" },
      { id: 15, name: "3DO", slug: "3do" },
      { id: 16, name: "Neo Geo", slug: "neo-geo" },
      { id: 17, name: "Web", slug: "web" },
    ]
  });


  useEffect(() => {
    const fetchData = async () => {
      setData(await getAllGames((selectedGenres ? `&genres=${selectedGenres}` : "") + (selectedPlatforms ? `&parent_platforms=${selectedPlatforms}` : "")+ (debouncedValue ? `&search=${debouncedValue}` : "")));
    };
    fetchData();
  }, [debouncedValue, selectedPlatforms, selectedGenres]);

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
            <div className="bar platforms">
              <select onChange={(e) => setSelectedPlatforms(e.target.value)} name="" id="">
                {filterData.platforms.map((item, index) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="bar genres">
              <select onChange={(e) => setSelectedGenres(e.target.value)} name="" id="">
                {filterData.genres.map((item, index) => (
                  <option value={item.slug}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="bar search">
              <input onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Keyword" />
            </div>
          </div>
          {data.results.length > 0 ? (
            <InfiniteScroll
              dataLength={data.results.length}
              next={getMoreGames}
              hasMore={!!data.next}
              loader={
                <React.Fragment>
                  {Array.from({ length: 15 }).map((_, index) => (
                    <div className="game hide-bg" key={index}>
                      <div className="img skeleton"></div>
                      {/* <div className="name skeleton"></div> */}
                    </div>
                  ))}
                </React.Fragment>
              }
              className="list"
              scrollableTarget="list"
            >
              {data.results.map((item, index) => (
                <div
                  className="game"
                  key={index}
                  onClick={() => goToDetail(item.slug)}
                >
                  <img className="img" src={item.background_image} alt="" />
                  <p className="name">{truncateText(item.name, 35)}</p>
                </div>
              ))}
            </InfiniteScroll>
          ) : (
            <div className="list gapfix">
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
