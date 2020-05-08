import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "../../index.scss";
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
import GameDetails from "../games/GameDetails";

class Homepage extends Component {
  state = {
    gameName: "",
    pageId: null,
    gridStyle: "col top-buffer",
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
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    this.props.actions.savePreviousPage(this.props.pageId, this.state.gameName);
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
      <div className="homepage container-fluid" id="fadein">
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
        <GameList
          games={searchResults.results ? searchResults.results : games.results}
          setGameToShow={this.props.actions.setGameToShow}
          toggleGameDetailsModal={this.props.actions.showGameDetailsModal}
          gridStyle={this.state.gridStyle}
        />
        {searchResults.count === 0 && (
          <div className="no-games-found">No games found!</div>
        )}
        <form
          className="center page-form"
          onSubmit={this.handlePageNumberSubmit}
        >
          <label className="pageNumber mb-0 mr-sm-0 top-buffer">
            Page number: {this.props.pageId}
          </label>
          <input
            type="number"
            id="pageNumber"
            ref={this.pageNumberInput}
            className="form-control"
            max={(games.count / 20 + 1).toFixed(0)}
            min={1}
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
    signInModal: state.modals.signInModal,
    gameIdToShow: state.games.gameIdToShow,
    pageId: state.games.pageId,
    store: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
