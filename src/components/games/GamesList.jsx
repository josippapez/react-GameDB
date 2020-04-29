import React from "react";
import GamesSummary from "./GamesSummary";

function GameList(props) {
  let gridStyle = "col top-buffer";
  if (window.innerWidth <= 800) gridStyle = "col-12 top-buffer";
  return (
    <div className="game-list container">
      <div className="row row-cols-4">
        {props.games.map((game) => {
          return (
            <div className={gridStyle} key={game.id}>
              <GamesSummary
                game={game}
                setGameToShow={props.setGameToShow}
                toggleGameDetailsModal={props.toggleGameDetailsModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default GameList;
