import React from "react";
import GamesSummary from "./gamessummary";
import { Link } from "react-router-dom";
function GameList({ games }) {
  return (
    <div className="game-list container">
      <div className="row row-cols-4">
        {games.map(game => {
          return (
            <div className="col top-buffer" key={game.id}>
              <Link to={"/game/" + game.id}>
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