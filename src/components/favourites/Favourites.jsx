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
  setFavourites,
} from "../../store/actions/gamesActions";
import GameDetails from "../games/GameDetails";
import GameList from "../games/GamesList";

class Favourites extends Component {
  componentDidMount() {
    if (
      !this.props.fetchedFavouriteGames.length &&
      this.props.favourites.length
    ) {
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

  componentDidUpdate() {
    if (
      this.props.store.firestore.data.favourites &&
      this.props.store.firestore.data.favourites[
        this.props.store.firebase.auth.uid
      ] &&
      this.props.store.firestore.data.favourites[
        this.props.store.firebase.auth.uid
      ].favourites.length &&
      !this.props.favourites.length
    ) {
      this.props.actions.setFavourites(
        this.props.store.firestore.data.favourites[
          this.props.store.firebase.auth.uid
        ].favourites
      );
      this.componentDidMount();
    }
  }

  render() {
    return (
      <div>
        {this.props.auth.isEmpty ? (
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
    store: state,
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
      setFavourites,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapStateToDispatch)(Favourites);
