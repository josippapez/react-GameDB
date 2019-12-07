import React, { Component } from "react";
import { connect } from "react-redux";
import GameList from "../games/gameslist";
import { fetchGames } from "../../store/actions/gamesActions";

class Homepage extends Component {
    state={
        pageId:1
    }
    componentDidMount() {
        this.props.fetch(this.state.pageId);
        if(this.state.pageId===1){
            var button = document.getElementById('decrement');
            button.classList.add("disabled");
        }
        else{
            button = document.getElementById('decrement');
            button.classList.remove("disabled");
        }
    }
    incrementPage=()=>{
        this.setState({
            pageId : this.state.pageId+1
        },()=>this.componentDidMount());
    }
    decrementPage=()=>{
        this.setState({
            pageId : this.state.pageId-1
        },()=>this.componentDidMount());
    }
    render() {
    var { games } = this.props;
    console.log("Games", this.props.games);
    return (
        <div className="homepage container">
        {games.results && <GameList games={games.results} />}
        <p className="center">{this.state.pageId}</p>
        <button
            className="btn-large waves-effect"
            id="decrement"
            onClick={this.decrementPage}
        >
            Previous Page
        </button>
        <button
            className="btn-large waves-effect"
            id="increment"
            onClick={this.incrementPage}
        >
            Next Page
        </button>
        </div>
    );
    }
}
const mapStateToProps = state => {
  console.log("home state:", state);
  return {
    games: state.games
  };
};

const mapStateToDispatch = dispatch => {
    console.log("dispatching");
  return {
    fetch: (pageId) => dispatch(fetchGames(pageId))
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Homepage);