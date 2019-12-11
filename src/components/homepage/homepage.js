import React, { Component } from "react";
import { connect } from "react-redux";
import GameList from "../games/gameslist";
import { fetchGames, fetchGame } from "../../store/actions/gamesActions";

class Homepage extends Component {
    state={
        pageId:1,
        gameName:""
    }
    checkPageNumberForButtons(){
        if(this.state.pageId===1){
            var button = document.getElementById('decrement');
            button.classList.add("disabled");
        }
        else{
            button = document.getElementById('decrement');
            button.classList.remove("disabled");
        }
    }
    componentDidMount() {
        if(this.state.gameName!==""){
            this.props.fetchFromSearch(this.state.gameName,this.state.pageId);
        }
        else{
            this.props.fetch(this.state.pageId);
        }
        this.checkPageNumberForButtons();
    }
    incrementPage=()=>{
        if(this.state.gameName.length===0){
            this.setState({
                pageId : this.state.pageId+1
            },()=>this.componentDidMount());
        }
        else{
            this.setState({
                pageId : this.state.pageId+1
            },()=>this.componentDidMount());
        }
    }
    decrementPage=()=>{
        if(this.state.gameName.length===0){
            this.setState({
                pageId : this.state.pageId-1
            },()=>this.componentDidMount());
        }
        else{
            this.setState({
                pageId : this.state.pageId-1
            },()=>this.componentDidMount());
        }
    }
    handleChange=(e)=>{
        if(e.target.value > 0){
        this.setState({
            pageId:e.target.valueAsNumber   
        })}
        else{console.log("Value has to be positive");
        }
    }
    handlePageNumberSubmit=(e)=>{
        e.preventDefault();
        this.componentDidMount();
    }
    handleQuerySubmit=(e)=>{
        e.preventDefault();
        var input = document.getElementById('searchText').value;
        this.setState({
            pageId:1,
            gameName:input
        },()=>this.componentDidMount()); 
    }
    render() {
        var { games } = this.props;
        var {searchResults}= this.props;
        return (
            <div className="homepage container" id="fadein">
                <form className="center" onSubmit={this.handleQuerySubmit}>
                    <input type="text" id="searchText" className="center"></input>
                    <button className="btn-small waves-effect blue">Submit</button>
                </form>
                {(searchResults.results && <GameList games={searchResults.results}/>)||(games.results && <GameList games={games.results} />)}

                <form className="center" onSubmit={this.handlePageNumberSubmit}>
                    Page number: {this.state.pageId} 
                    <input type="number" id="pageNumber" onChange={this.handleChange} className="center"></input>
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
  return {
    games: state.games,
    searchResults: state.searchResults
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    fetch: (pageId) => dispatch(fetchGames(pageId)),
    fetchFromSearch: (gameName, pageId) => dispatch(fetchGame(gameName,pageId))
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Homepage);