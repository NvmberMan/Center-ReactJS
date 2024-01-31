import React from "react";

function SteamAchievementGamelist(props) {
  
  const { gameData = [], firstIndex = 0, secondIndex = 4 } = props;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div>
      {gameData && gameData.length > 0
        ? gameData.slice(firstIndex, secondIndex).map((data, index) => (
            <div key={index} className="box">
              <img src={data.background_image} alt="" />
              <p>{truncateText(data.name, 17)}</p>
            </div>
          ))
        : Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="box">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"
                alt=""
              />
              <p>Grand Theft Auto V</p>
            </div>
          ))}
    </div>
  );
}

export default SteamAchievementGamelist;
