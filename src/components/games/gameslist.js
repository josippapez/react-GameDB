import React from "react";
import GamesSummary from "./gamessummary";
import { Link } from "react-router-dom";
function GameList({ games }) {
  let gridStyle="col top-buffer";
  if( window.innerWidth<=800) gridStyle="col-5 top-buffer";
  return (
    <div className="game-list container">
      <div className="row row-cols-4">
        {games.map(game => {
          return (
            <div className={gridStyle} key={game.id}>
              <Link to={"/game/" + game.id} className="text-decoration-none">
                <GamesSummary game={game} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default GameList;