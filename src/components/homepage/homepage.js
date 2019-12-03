import React, { Component } from 'react'
import Axios from 'axios';
import GameList from '../games/gameslist'

class Homepage extends Component {
    state={
        games:[],
        x:1
    }
    componentDidMount(){
        Axios.get('https://api.rawg.io/api/games?page='+this.state.x)
            .then(res=>{
                console.log(res);
                this.setState({
                    games:res.data.results
                })
            });
            if(this.state.x===1){
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
            x : this.state.x+1
        },()=>this.componentDidMount());
    }
    decrementPage=()=>{
        this.setState({
            x : this.state.x-1
        },()=>this.componentDidMount());
    }
    render() {
        const {games} = this.state;
        return (
            <div className="homepage container">
                <GameList games={games}/>
                <button className="btn-large waves-effect" id="decrement" onClick={this.decrementPage}>Previous Page</button>
                <button className="btn-large waves-effect" id="increment" onClick={this.incrementPage}>Next Page</button>
            </div>   
        )
    }
}
export default Homepage;