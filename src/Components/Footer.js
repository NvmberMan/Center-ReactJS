import React from "react";
import Steam from "../Images/Steam.png";
import EpicGames from "../Images/Epic Games.png";
import Rawg from "../Images/RAWG.png";
import Itchio from "../Images/Itch Io.png";
import Xbox from "../Images/Xbox.png";
import Battlenet from "../Images/Battlenet.png";
import Playstation from "../Images/Playstation.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="content">
        <div className="top">
          © 2024 CentralCommunity. All rights reserved. All trademarks are the
          property of their respective owners in the US and other countries. VAT
          included in all prices where applicable. Privacy Policy | Legal |
          [Service Name] Subscriber Agreement | Refunds | Cookies
        </div>
        <div className="bottom">
          <img src={Steam} alt="" />
          <img src={EpicGames} alt="" />
          <img src={Rawg} alt="" />
          <img src={Itchio} alt="" />
          <img src={Xbox} alt="" />
          <img src={Battlenet} alt="" />
          <img src={Playstation} alt="" />
        </div>
      </div>
    </div>
  );
}
