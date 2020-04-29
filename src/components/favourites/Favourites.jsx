import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchGames,
  fetchGame,
  showGameDetailsModal,
  fetchFavouriteDetails,
  setGameToShow,
  removeFavouriteDetails,
} from "../../store/actions/gamesActions";
import GameDetails from "../games/GameDetails";

class Favourites extends Component {
  componentDidMount() {
    this.props.favourites.map((favourite) =>
      this.props.actions.fetchFavouriteDetails(favourite)
    );
  }

  componentWillUnmount() {
    this.props.actions.removeFavouriteDetails();
  }

  render() {
    let gridStyle = "col-4 top-buffer";
    if (window.innerWidth <= 800) gridStyle = "col-12 top-buffer";
    return (
      <div className="game-list container">
        <div className="row row-cols-4">
          {this.props.fetchedFavouriteGames &&
            this.props.fetchedFavouriteGames.map((game) => {
              return (
                <div className={gridStyle} key={game.id}>
                  <div
                    className="card shadow-lg"
                    id="card"
                    onClick={() => {
                      this.props.actions.setGameToShow(game.id);
                      this.props.actions.showGameDetailsModal();
                    }}
                  >
                    <div className="card-image-top z-depth-5">
                      <img src={game.background_image} alt={game.slug} />
                    </div>
                    <div className="card-body">
                      <span className="card-title">
                        <b>
                          <b>{game.name}</b>
                        </b>
                      </span>
                      <div className="card-content">
                        <p>
                          <b>{game.ratings_count} people rated</b>
                        </p>
                        <p>
                          <b>Rating: {game.rating}</b>
                        </p>
                      </div>
                    </div>
                    <img
                      src={game.background_image}
                      alt={game.slug}
                      id="bg-image"
                    />
                  </div>
                </div>
              );
            })}
        </div>
        {this.props.gameDetailsModal && (
          <GameDetails
            favourite
            id={this.props.gameIdToShow}
            gameDetailsModal={this.props.gameDetailsModal}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favourites: state.games.favourites,
    fetchedFavouriteGames: state.games.fetchedFavouriteGames,
    gameIdToShow: state.games.gameIdToShow,
    gameDetailsModal: state.modals.showGameDetailsModal,
  };
};

const mapStateToDispatch = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchGames,
      fetchGame,
      showGameDetailsModal,
      fetchFavouriteDetails,
      setGameToShow,
      removeFavouriteDetails,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapStateToDispatch)(Favourites);
