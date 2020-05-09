import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-responsive-modal";
import classNames from "classnames";

import {
  fetchGameDetail,
  resetGame,
  showGameDetailsModal,
  addToFavourites,
} from "../../store/actions/gamesActions";
import "../../styles/GameDetails.scss";
import Colors from "../../styles/_colors.scss";

class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metacriticAnimation: false,
      ratingsAnimation: false,
      metacriticVisiblitly: false,
      ratingsVisibility: false,
      gridStyle: "row row-cols-2",
    };
  }
  componentDidMount() {
    this.props.actions.fetchGameDetail(this.props.id);
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    this.props.actions.resetGame();
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = () => {
    if (window.innerWidth < 995) {
      this.setState({
        gridStyle: "row row-cols-1",
      });
    } else {
      this.setState({
        gridStyle: "row row-cols-2",
      });
    }
  };
  checkForVideo = (game) => {
    if (game.clip && game.clip != null) {
      return <video controls src={game.clip.clip} muted />;
    }
  };
  alternativeNames = (game) => {
    if (game.alternative_names && game.alternative_names.length > 0) {
      return (
        <p>
          Alternative names:
          {game.alternative_names
            .map((name) => {
              return " " + name;
            })
            .join(", ")}
        </p>
      );
    }
  };
  metacritic = () => {
    setTimeout(() => {
      this.setState({
        metacriticAnimation: true,
        metacriticVisiblitly: true,
      });
    }, 1000);
  };
  developers = (game) => {
    if (game.developers && game.developers.length > 0) {
      return (
        <p>
          Developers:
          {game.developers
            .map((developer) => {
              return " " + developer.name;
            })
            .join(", ")}
        </p>
      );
    }
  };
  ratings = () => {
    setTimeout(() => {
      this.setState({
        ratingsAnimation: true,
        ratingsVisibility: true,
      });
    }, 1000);
  };
  render() {
    return (
      <div>
        {this.props.game.id && (
          <div>
            <Modal
              open={this.props.gameDetailsModal}
              closeIconId="game-details-close-icon"
              closeOnOverlayClick
              closeOnEsc
              modalId="game-details-modal"
              onClose={this.props.actions.showGameDetailsModal}
              styles={{
                overlay: {
                  background: Colors.overlay,
                  display: "flex",
                  alignItems: "flex-start",
                  position: "fixed",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "1.2rem",
                },
              }}
            >
              <div className="detail-card container-xl-1" id="fadein">
                <div className={this.state.gridStyle}>
                  <div className="col">
                    {!this.props.favourite && !this.props.auth.isEmpty && (
                      <button
                        className={classNames({
                          btn: true,
                          "btn-flat": true,
                          "favourites-button": true,
                          "btn-success disabled":
                            this.props.favourites &&
                            this.props.favourites.includes(this.props.game.id),
                          "btn-outline-success":
                            this.props.favourites &&
                            !this.props.favourites.includes(this.props.game.id),
                        })}
                        onClick={() => {
                          this.props.actions.addToFavourites(
                            this.props.game.id
                          );
                        }}
                      >
                        {this.props.favourites.includes(this.props.game.id)
                          ? "Added to favourites"
                          : "Add to favourites"}
                      </button>
                    )}
                    <div className="detail-card-image">
                      <img
                        src={this.props.game.background_image}
                        alt={this.props.game.slug}
                      />
                    </div>
                    <div className="detail-video-clip top-buffer">
                      {this.checkForVideo(this.props.game)}
                    </div>
                  </div>
                  <div className="col jumbotron">
                    <div
                      metacritic={
                        !this.state.metacriticAnimation ? this.metacritic() : ""
                      }
                      style={{ "--width": this.props.game.metacritic + "%" }}
                      className={
                        "square text-white font-weight-bold" +
                        (this.state.metacriticAnimation ? " animation" : "")
                      }
                    >
                      <label
                        className={
                          this.state.metacriticVisiblitly ? "" : "invisible"
                        }
                      >
                        {this.props.game.metacritic}
                      </label>
                    </div>
                    <p className="detail-card-title font-weight-bold display-4 top-buffer">
                      {this.props.game.name}
                    </p>
                    <div id="alternative-name">
                      {this.alternativeNames(this.props.game)}
                    </div>
                    <hr className="my-4" />
                    <p>Released: {this.props.game.released}</p>
                    <div className="container text-justify">
                      {this.props.game.description_raw}
                    </div>
                    <div className="developers font-weight-bold top-buffer">
                      {this.developers(this.props.game)}
                    </div>
                    <ul
                      className={
                        "ratings list-group" +
                        (this.state.ratingsVisibility ? "" : " invisible")
                      }
                    >
                      <p
                        className="ratings text-left"
                        ratings={
                          !this.state.ratingsAnimation ? this.ratings() : ""
                        }
                      >
                        Ratings:
                      </p>
                      {this.props.game.ratings &&
                        this.props.game.ratings.map((rating) => {
                          return (
                            <div
                              className="d-inline-flex text-capitalize"
                              key={rating.id}
                            >
                              <li
                                style={{ "--width": rating.percent + "%" }}
                                className={
                                  "list-group-item text-capitalize p-2 mr-3" +
                                  (this.state.ratingsAnimation
                                    ? " animation"
                                    : "")
                                }
                                id={rating.title}
                              >
                                {rating.percent}%
                              </li>
                              {rating.title}
                            </div>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    game: state.games.game,
    auth: state.firebase.auth,
    favourites: state.games.favourites,
  };
};

const mapStateToDispatch = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchGameDetail,
      resetGame,
      showGameDetailsModal,
      addToFavourites,
    },
    dispatch
  ),
});
export default connect(mapStateToProps, mapStateToDispatch)(GameDetails);
