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
    handleChange=(e)=>{
        if(e.target.value > 0){
        this.setState({
            pageId:e.target.value
        })}
        else{console.log("Value has to be positive");
        }
    }
    handlePageNumberSubmit=(e)=>{
        e.preventDefault();
        this.componentDidMount();
    }
    render() {
    var { games } = this.props;
    console.log("Games", this.props.games);
    return (
        <div className="homepage container">
        {games.results && <GameList games={games.results} />}
        <form className="center" onSubmit={this.handlePageNumberSubmit}>
            Page number: <input type="number" id="pageNumber"  onChange={this.handleChange} className="center"></input>
            <button className="btn-small waves-effect blue">Submit</button>
        </form>
        <button className="btn-large waves-effect" id="decrement" onClick={this.decrementPage}>
            Previous Page
        </button>
        <button className="btn-large waves-effect" id="increment" onClick={this.incrementPage}
        >
            Next Page
        </button>
        </div>
    );
    }
}
const mapStateToProps = (state) => {
  console.log("home state:", state);
  return {
    games: state.games
  };
};

const mapStateToDispatch = (dispatch) => {
    console.log("dispatching");
  return {
    fetch: (pageId) => dispatch(fetchGames(pageId))
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Homepage);