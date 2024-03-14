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
import { database } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

function Wishlist() {
  const [data, setData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState("");
  const [selectedSearch, setSearch] = useState();
  const [debouncedValue] = useDebounce(selectedSearch, 500);
  const { currentUser } = useAuth();
  const [emptyData, setEmptyData] = useState(false);

  const [filterData, setFilterData] = useState({
    genres: [
      { name: "Genres", slug: "" },
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
    platforms: [
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
    ],
  });

  useEffect(() => {
    if (currentUser) {
      // Membuat referensi ke lokasi wishlist pengguna
      const wishlistRef = database.ref(`users/${currentUser.uid}/wishlist`);

      // Mendapatkan data dari lokasi wishlist
      wishlistRef
        .once("value")
        .then((snapshot) => {
          // Mengakses data dari snapshot
          const wishlistData = snapshot.val();
          if (wishlistData) {
            // Wishlist pengguna tersedia, lakukan sesuatu dengan datanya
            const wishlistArray = Object.values(wishlistData); // Mengubah objek menjadi array
            setData(wishlistArray);
            console.log("Wishlist pengguna:", wishlistArray);
          } else {
            // Wishlist pengguna tidak tersedia atau kosong
            console.log("Wishlist pengguna kosong.");
          }
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching wishlist:", error);
        });
    } else {
      window.location = "/login";
    }
  }, []);

  useEffect(() => {}, [data]);

  const goToDetail = (slug) => {
    window.location = "/detail/" + slug;
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.length === 0) {
        setEmptyData(true);
      }
    }, 3000); // Tunggu 10 detik sebelum menampilkan pesan alert

    return () => clearTimeout(timer); // Hapus timer jika komponen di-unmount atau data berubah
  }, [data]);

  return (
    <div>
      <div className="container allgame">
        <Navbar />
        <div className="content" style={{minHeight: "70vh"}}>
          <div className="filter">
            <div className="bar">
              <p>Show All</p>
              <FontAwesomeIcon className="icon" icon={faAngleDown} />
            </div>
            <div className="bar platforms">
              <select
                onChange={(e) => setSelectedPlatforms(e.target.value)}
                name=""
                id=""
              >
                {filterData.platforms.map((item, index) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="bar genres">
              <select
                onChange={(e) => setSelectedGenres(e.target.value)}
                name=""
                id=""
              >
                {filterData.genres.map((item, index) => (
                  <option value={item.slug}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="bar search">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Keyword"
              />
            </div>
          </div>
          {!emptyData ? (
            data && data.length > 0 ? (
              <div className="list">
                {data.map((item, index) => (
                  <div
                    className="game"
                    key={index}
                    onClick={() => goToDetail(item.slug)}
                  >
                    <img className="img" src={item.background_image} alt="" />
                    <p className="name">{truncateText(item.name, 35)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="list gapfix">
                {Array.from({ length: 15 }).map((_, index) => (
                  <div className="game hide-bg" key={index}>
                    <div className="img skeleton"></div>
                    <div className="name skeleton"></div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="empty-data">
              <p>You dont have any wishlist game.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Wishlist;
