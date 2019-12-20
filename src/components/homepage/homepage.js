import React, { Component } from "react";
import { connect } from "react-redux";
import GameList from "../games/gameslist";
import { fetchGames, fetchGame, savePreviousPage } from "../../store/actions/gamesActions";

class Homepage extends Component {
    state={
        pageId:1,
        gameName:""
    }
    checkPageNumberForButtons(){
        if(this.state.pageId===1){
            var button = document.getElementById('decrement');
            button.setAttribute("disabled","disabled");
        }
        else{
            button = document.getElementById('decrement');
            button.removeAttribute("disabled");
        }
    }
    componentWillMount(){
        if(this.props.previousPage!=null ||this.props.previousGameName!=null){
            this.setState({
                pageId:this.props.previousPage,
                gameName:this.props.previousGameName
            },()=>{this.componentDidMount()})
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
    componentWillUnmount(){
        this.props.setPreviousPage(this.state.pageId,this.state.gameName);
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
                pageId:e.target.valueAsNumber   
            })
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
            <div className="homepage container-fluid top-buffer" id="fadein">
                <form className="center form-check-inline" onSubmit={this.handleQuerySubmit}>
                    <label className="mb-0 mr-sm-2 text-white">Search:</label>
                    <input type="text" id="searchText" className="form-control"></input>
                    <button className="btn btn-dark mx-2">Submit</button>
                </form>
                {(searchResults.results && <GameList games={searchResults.results}/>)||(games.results && <GameList games={games.results} />)}
                <form className="center" onSubmit={this.handlePageNumberSubmit}>
                    <label className="mb-0 mr-sm-0 top-buffer">Page number: {this.state.pageId}</label> 
                    <input type="number" id="pageNumber" onChange={this.handleChange} className="form-control"></input>
                    <button className="btn btn-dark">Submit</button>
                </form>
                <button className="btn btn-outline-primary btn-lg" id="decrement" onClick={this.decrementPage}>
                    Previous Page
                </button>
                <button className="btn btn-outline-secondary btn-lg" id="increment" onClick={this.incrementPage}>
                    Next Page
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    games: state.games,
    searchResults: state.searchResults,
    previousPage: state.previousPage,
    previousGameName:state.previousGameName
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    fetch: (pageId) => dispatch(fetchGames(pageId)),
    fetchFromSearch: (gameName, pageId) => dispatch(fetchGame(gameName,pageId)),
    setPreviousPage: (previousPage,gameName)=>dispatch(savePreviousPage(previousPage,gameName))
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Homepage);