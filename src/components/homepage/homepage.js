import React, { Component } from 'react'
import {connect} from 'react-redux';
import GameList from '../games/gameslist'

class Homepage extends Component {
    render() {
        var {games} = this.props;
        console.log("Games",{games});
        return (
            <div className="homepage container">
                <GameList games={games}/>
                <p className="center"></p>
                <button className="btn-large waves-effect" id="decrement" onClick={this.decrementPage}>Previous Page</button>
                <button className="btn-large waves-effect" id="increment" onClick={this.incrementPage}>Next Page</button>
            </div>   
        )
    }
}
const mapStateToProps=(state)=>{
    console.log("Mapping!");
    return{
        games:state
    }
}

export default connect(mapStateToProps)(Homepage);