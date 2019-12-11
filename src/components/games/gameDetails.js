import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGameDetail } from "../../store/actions/gamesActions";

class GameDetails extends Component {
    componentDidMount(){
        this.props.fetch(this.props.match.params.id);
    }
    checkForVideo(game){
        if(game.clip && game.clip!=null){
            return(
                <video controls src={game.clip.clip} muted/>
            )
        }
    }
    alternativeNames(game){
        if(game.alternative_names && game.alternative_names.length>0){
            return(
            <p>Alternative names:
                {game.alternative_names.map((name)=>{
                    return(
                        " " + name
                    )
                }).join(", ")}
            </p>
            )
        }
    }
    developers(game){
        if(game.developers && game.developers.length>0){
            return(
            <p><b>Developers:
                {game.developers.map((developer)=>{
                    return(
                       " " + developer.name
                    )
                }).join(", ")}
            </b></p>
            )
        }
    }
    render(){
        let { game } = this.props;
        return (
            <div className="detail-card grid-container" id="fadein">
                <div>
                    <div className="detail-card-image hoverable">
                        <img src={game.background_image} alt={game.slug}/>
                    </div>
                    <div className="detail-video-clip">
                        {this.checkForVideo(game)}
                    </div>
                </div>
                <div className="detail-card-content">
                    <p className="detail-card-title"><b>{game.name}</b></p>
                    <div className="square white-text"><p><b>{game.metacritic}</b></p></div>
                    <div id="alternative-name">
                        {this.alternativeNames(game)}
                    </div>
                    <div className="container" id="detail-card-description">
                        <p>Released: {game.released}</p>
                            {game.description_raw}
                    </div>
                    <div className="developers">
                       {this.developers(game)}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        game:state.game
    };
  };
  
  const mapStateToDispatch = dispatch => {
    return {
      fetch: (gameId) => dispatch(fetchGameDetail(gameId))
    };
  };
export default connect(mapStateToProps, mapStateToDispatch)(GameDetails);