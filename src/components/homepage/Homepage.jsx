import React, { Component } from "react";
import { connect } from "react-redux";
import GameList from "../games/GamesList";
import {
  fetchGames,
  fetchGame,
  savePreviousPage,
  showGameDetailsModal,
} from "../../store/actions/gamesActions";
import { bindActionCreators } from "redux";
import GameDetails from "../games/GameDetails";

class Homepage extends Component {
  state = {
    pageId: 1,
    gameName: "",
    gameId: "",
  };

  checkPageNumberForButtons() {
    if (this.state.pageId === 1) {
      var button = document.getElementById("decrement");
      button.setAttribute("disabled", "disabled");
    } else {
      button = document.getElementById("decrement");
      button.removeAttribute("disabled");
    }
  }
  componentWillMount() {
    if (
      this.props.previousPage != null ||
      this.props.previousGameName != null
    ) {
      this.setState(
        {
          pageId: this.props.previousPage,
          gameName: this.props.previousGameName,
        },
        () => {
          this.componentDidMount();
        }
      );
    }
  }
  componentDidMount() {
    if (this.state.gameName !== "") {
      this.props.actions.fetchGame(this.state.gameName, this.state.pageId);
    } else {
      this.props.actions.fetchGames(this.state.pageId);
    }
    this.checkPageNumberForButtons();
  }
  componentWillUnmount() {
    this.props.actions.savePreviousPage(this.state.pageId, this.state.gameName);
  }
  incrementPage = () => {
    this.setState(
      {
        pageId: this.state.pageId + 1,
      },
      () => this.componentDidMount()
    );
  };
  decrementPage = () => {
    this.setState(
      {
        pageId: this.state.pageId - 1,
      },
      () => this.componentDidMount()
    );
  };
  handleChange = (e) => {
    if (e.target.value > 0) {
      this.setState({
        pageId: e.target.valueAsNumber,
      });
    }
  };
  handlePageNumberSubmit = (e) => {
    e.preventDefault();
    this.componentDidMount();
  };
  handleQuerySubmit = (e) => {
    e.preventDefault();
    var input = document.getElementById("searchText").value;
    this.setState(
      {
        pageId: 1,
        gameName: input,
      },
      () => this.componentDidMount()
    );
  };
  setGameToShow = (gameId) => {
    this.setState({ gameId });
  };
  render() {
    var { games, searchResults } = this.props;
    return (
      <div className="homepage container-fluid top-buffer" id="fadein">
        {this.props.gameDetailsModal && (
          <GameDetails
            id={this.state.gameId}
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
            setGameToShow={this.setGameToShow}
            toggleGameDetailsModal={this.props.actions.showGameDetailsModal}
          />
        )) ||
          (games.results && (
            <GameList
              games={games.results}
              setGameToShow={this.setGameToShow}
              toggleGameDetailsModal={this.props.actions.showGameDetailsModal}
            />
          ))}
        <form className="center" onSubmit={this.handlePageNumberSubmit}>
          <label className="mb-0 mr-sm-0 top-buffer">
            Page number: {this.state.pageId}
          </label>
          <input
            type="number"
            id="pageNumber"
            onChange={this.handleChange}
            className="form-control"
          ></input>
          <button className="btn btn-dark">Submit</button>
        </form>
        <button
          className="btn btn-outline-primary btn-lg"
          id="decrement"
          onClick={this.decrementPage}
        >
          Previous Page
        </button>
        <button
          className="btn btn-outline-secondary btn-lg"
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
  };
};

const mapStateToDispatch = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchGames,
      fetchGame,
      savePreviousPage,
      showGameDetailsModal,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapStateToDispatch)(Homepage);
