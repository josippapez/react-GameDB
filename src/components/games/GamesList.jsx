import React from "react";
import GamesSummary from "./GamesSummary";

function GameList(props) {
  return (
    <div className="game-list container">
      <div className="row row-cols-4">
        {props.games && props.games.map((game) => {
          return (
            <div className={props.gridStyle} key={game.id}>
              <GamesSummary
                game={game}
                setGameToShow={props.setGameToShow}
                toggleGameDetailsModal={props.toggleGameDetailsModal}
                favourites={props.favourites}
                removeFromFavourites={props.removeFromFavourites}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default GameList;
