import React from "react";

function GamesSummary(props) {
  return (
    <div
      className="card shadow-lg"
      id="card"
      onClick={() => {
        props.setGameToShow(props.game.id);
        props.toggleGameDetailsModal();
      }}
    >
      <div className="card-image-top z-depth-5">
        <img src={props.game.background_image} alt={props.game.slug} />
      </div>
      <div className="card-body">
        <span className="card-title">
          <b>
            <b>{props.game.name}</b>
          </b>
        </span>
        <div className="card-content">
          <p>
            <b>{props.game.ratings_count} people rated</b>
          </p>
          <p>
            <b>Rating: {props.game.rating}</b>
          </p>
        </div>
      </div>
      <img
        src={props.game.background_image}
        alt={props.game.slug}
        id="bg-image"
      />
    </div>
  );
}

export default GamesSummary;
