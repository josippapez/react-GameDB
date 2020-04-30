import React, { Component } from "react";
import { connect } from "react-redux";
import GameList from "../games/GamesList";
import {
  fetchGames,
  fetchGame,
  savePreviousPage,
  showGameDetailsModal,
  setGameToShow,
  incrementPage,
  decrementPage,
  setPage,
} from "../../store/actions/gamesActions";
import { bindActionCreators } from "redux";

import GameDetails from "../games/GameDetails";

class Homepage extends Component {
  state = {
    gameName: "",
    pageId: null,
  };
  pageNumberInput = React.createRef();

  checkPageNumberForButtons() {
    if (this.props.pageId === 1) {
      var button = document.getElementById("decrement");
      button.setAttribute("disabled", "disabled");
    } else {
      button = document.getElementById("decrement");
      button.removeAttribute("disabled");
    }
  }
  componentDidUpdate(nextProps) {
    if (nextProps.pageId !== this.props.pageId) {
      this.componentDidMount();
    }
  }
  componentDidMount() {
    if (this.state.gameName !== "") {
      this.props.actions.fetchGame(this.state.gameName, this.props.pageId);
    } else {
      this.props.actions.fetchGames(this.props.pageId);
    }
    this.checkPageNumberForButtons();
  }
  componentWillUnmount() {
    this.props.actions.savePreviousPage(this.props.pageId, this.state.gameName);
  }

  incrementPage = () => {
    this.props.actions.incrementPage();
  };
  decrementPage = () => {
    this.props.actions.decrementPage();
  };
  handlePageNumberSubmit = (e) => {
    e.preventDefault();
    if (this.pageNumberInput.current) {
      this.props.actions.setPage(this.pageNumberInput.current.valueAsNumber);
    }
  };
  handleQuerySubmit = (e) => {
    e.preventDefault();
    var input = document.getElementById("searchText").value;
    this.props.actions.setPage(1);
    this.setState(
      {
        gameName: input,
      },
      () => this.componentDidMount()
    );
  };
  render() {
    var { games, searchResults } = this.props;
    return (
      <div className="homepage container-fluid top-buffer" id="fadein">
        {this.props.gameDetailsModal && (
          <GameDetails
            id={this.props.gameIdToShow}
            gameDetailsModal={this.props.gameDetailsModal}
          />
        )}
        <form
          className="center form-check-inline"
          onSubmit={this.handleQuerySubmit}
        >
          <label className="mb-0 mr-sm-2 text-white">Search:</label>
          <input
            type="text"
            id="searchText"
            className="form-control"
            placeholder={
              this.state.gameName !== ""
                ? "Press Enter key here to reset search"
                : ""
            }
          />
          <button className="btn btn-dark mx-2">Submit</button>
        </form>
        {(searchResults.results && (
          <GameList
            games={searchResults.results}
            setGameToShow={this.props.actions.setGameToShow}
            toggleGameDetailsModal={this.props.actions.showGameDetailsModal}
          />
        )) ||
          (games.results && (
            <GameList
              games={games.results}
              setGameToShow={this.props.actions.setGameToShow}
              toggleGameDetailsModal={this.props.actions.showGameDetailsModal}
            />
          ))}
        <form className="center" onSubmit={this.handlePageNumberSubmit}>
          <label className="pageNumber mb-0 mr-sm-0 top-buffer">
            Page number: {this.props.pageId}
          </label>
          <input
            type="number"
            id="pageNumber"
            ref={this.pageNumberInput}
            className="form-control"
          ></input>
          <button className="btn btn-dark">Submit</button>
        </form>
        <button
          className="btn btn-outline-light btn-lg"
          id="decrement"
          onClick={this.decrementPage}
        >
          Previous Page
        </button>
        <button
          className="btn btn-outline-light btn-lg"
          id="increment"
          onClick={this.incrementPage}
        >
          Next Page
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    games: state.games.games,
    searchResults: state.games.searchResults,
    previousPage: state.games.previousPage,
    previousGameName: state.games.previousGameName,
    gameDetailsModal: state.modals.showGameDetailsModal,
    gameIdToShow: state.games.gameIdToShow,
    pageId: state.games.pageId,
  };
};

const mapStateToDispatch = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchGames,
      fetchGame,
      savePreviousPage,
      showGameDetailsModal,
      setGameToShow,
      incrementPage,
      decrementPage,
      setPage,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapStateToDispatch)(Homepage);
