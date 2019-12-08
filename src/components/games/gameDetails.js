import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGameDetail } from "../../store/actions/gamesActions";

class GameDetails extends Component {
    componentDidMount(){
        this.props.fetch(this.props.match.params.id);
    }
    render(){
        let { game } = this.props;
        return (
            <div className="detail-card grid-container">
                <div className="detail-card-image hoverable">
                    <img src={game.background_image} alt={game.slug}/>
                </div>
                <p className="detail-card-title"><b>{game.name}</b></p>
                
                <div id="alternative-name">
                <p>Alternative names:</p>
                    {game.alternative_names && game.alternative_names.map((name)=>{
                        return(
                            <div key={name}>{name}</div>
                        )
                    })}
                </div>
                <div className="container" id="detail-card-description">
                <p>Released: {game.released}</p>
                    {game.description_raw}
                </div>
                <div className="section">
                Developers:
                    {game.developers && game.developers.map((developer)=>{
                        return(
                            <div key={developer.id}>{developer.name}</div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log("home state:", state.game);
    return {
        game:state.game
    };
  };
  
  const mapStateToDispatch = dispatch => {
      console.log("dispatching");
    return {
      fetch: (gameId) => dispatch(fetchGameDetail(gameId))
    };
  };
export default connect(mapStateToProps, mapStateToDispatch)(GameDetails);