import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import "./Favourites.scss";
import {
  fetchGames,
  fetchGame,
  showGameDetailsModal,
  fetchFavouriteDetails,
  setGameToShow,
  removeFavouriteDetails,
  removeFromFavourites,
} from "../../store/actions/gamesActions";
import GameDetails from "../games/GameDetails";
import GameList from "../games/GamesList";

class Favourites extends Component {
  componentDidMount() {
    if (!this.props.fetchedFavouriteGames.length) {
      this.props.favourites.map((favourite) =>
        this.props.actions.fetchFavouriteDetails(favourite)
      );
    } else if (
      this.props.fetchedFavouriteGames &&
      this.props.fetchedFavouriteGames.length < this.props.favourites.length
    ) {
      for (
        let index = 1;
        index <=
        this.props.favourites.length - this.props.fetchedFavouriteGames.length;
        index++
      ) {
        this.props.actions.fetchFavouriteDetails(
          this.props.favourites[this.props.favourites.length - index]
        );
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.auth.isLoaded && this.props.auth.isEmpty && this.props.favourites.length ? (
          <Redirect to="/" />
        ) : (
          <div className="favourites">
            {this.props.fetchedFavouriteGames.length ===
              this.props.favourites.length && (
              <div>
                <GameList
                  games={this.props.fetchedFavouriteGames}
                  setGameToShow={this.props.actions.setGameToShow}
                  toggleGameDetailsModal={
                    this.props.actions.showGameDetailsModal
                  }
                  favourites
                  removeFromFavourites={this.props.actions.removeFromFavourites}
                />
                {this.props.gameDetailsModal && (
                  <GameDetails
                    favourite
                    id={this.props.gameIdToShow}
                    gameDetailsModal={this.props.gameDetailsModal}
                  />
                )}
              </div>
            )}
          </div>
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
    auth: state.firebase.auth,
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
      removeFromFavourites,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapStateToDispatch)(Favourites);
