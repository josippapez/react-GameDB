import React from "react";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";

function GamesSummary(props, { scrollPosition }) {
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
        <LazyLoadImage
          alt={props.game.slug}
          scrollPosition={scrollPosition}
          src={props.game.background_image}
        />
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
      <LazyLoadImage
        id="bg-image"
        alt={props.game.slug}
        effect="blur"
        src={props.game.background_image}
      />
    </div>
  );
}

export default trackWindowScroll(GamesSummary);
