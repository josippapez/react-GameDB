import React, { Component } from "react";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import classNames from "classnames";

class GamesSummary extends Component {
  state = { hovered: false };
  render() {
    return (
      <div
        onMouseEnter={() => {
          this.setState({ hovered: true });
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false });
        }}
      >
        {this.props.favourites && (
          <button
            className="btn-danger w-100"
            onClick={() => {
              this.props.removeFromFavourites(this.props.game.id);
            }}
          >
            Remove from favourites
          </button>
        )}

        <div
          className="card shadow-lg"
          id="card"
          onClick={() => {
            this.props.setGameToShow(this.props.game.id);
            this.props.toggleGameDetailsModal();
          }}
        >
          <div className="card-image-top z-depth-5">
            <LazyLoadImage
              alt={this.props.game.slug}
              scrollPosition={this.props.scrollPosition}
              src={this.props.game.background_image}
            />
          </div>
          <div
            className={classNames({
              "card-body": true,
              hover: this.state.hovered,
            })}
          >
            <span className="card-title">
              <b>
                <b>{this.props.game.name}</b>
              </b>
            </span>
            <div className="card-content">
              <p>
                <b>{this.props.game.ratings_count} people rated</b>
              </p>
              <p>
                <b>Rating: {this.props.game.rating}</b>
              </p>
            </div>
          </div>
          <LazyLoadImage
            id="bg-image"
            alt={this.props.game.slug}
            effect="blur"
            src={this.props.game.background_image}
          />
        </div>
      </div>
    );
  }
}

export default trackWindowScroll(GamesSummary);
