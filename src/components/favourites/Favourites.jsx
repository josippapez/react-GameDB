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
  state = {
    gridStyle: "col top-buffer",
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    if (
      !this.props.fetchedFavouriteGames.length &&
      this.props.favourites.length
    ) {
      this.props.favourites.map((favourite) =>
        this.props.actions.fetchFavouriteDetails(favourite)
      );
    } else if (
      this.props.fetchedFavouriteGames &&
      this.props.favourites &&
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (window.innerWidth < 770) {
      this.setState({
        gridStyle: "col-12 top-buffer",
      });
    } else if (window.innerWidth < 995) {
      this.setState({
        gridStyle: "col-6 top-buffer",
      });
    } else {
      this.setState({
        gridStyle: "col top-buffer",
      });
    }
  };

  render() {
    return (
      <div className="favourites" style={{ "--height": window.innerHeight + "px" }} id="fadein">
        {this.props.auth.isEmpty ? (
          <Redirect to="/" />
        ) : (
          <div>
            {this.props.fetchedFavouriteGames &&
              this.props.favourites &&
              this.props.fetchedFavouriteGames.length ===
                this.props.favourites.length && (
                <div>
                  <GameList
                    games={this.props.fetchedFavouriteGames}
                    setGameToShow={this.props.actions.setGameToShow}
                    toggleGameDetailsModal={
                      this.props.actions.showGameDetailsModal
                    }
                    favourites
                    removeFromFavourites={
                      this.props.actions.removeFromFavourites
                    }
                    gridStyle={this.state.gridStyle}
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
