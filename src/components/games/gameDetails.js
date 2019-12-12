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
            <p>Developers:
                {game.developers.map((developer)=>{
                    return(
                       " " + developer.name
                    )
                }).join(", ")}
            </p>
            )
        }
    }
    render(){
        let { game } = this.props;
        return (
            <div className="detail-card container-xl-1" id="fadein">
                <div className="row row-cols-2">
                    <div className="col">
                        <div className="detail-card-image">
                            <img src={game.background_image} alt={game.slug}/>
                        </div>
                        <div className="detail-video-clip top-buffer">
                            {this.checkForVideo(game)}
                        </div>
                    </div>
                    <div className="detail-card-content col">
                        <p className="detail-card-title font-weight-bold">{game.name}</p>
                        <div className="square text-white font-weight-bold"><label>{game.metacritic}</label></div>
                        <div id="alternative-name">
                            {this.alternativeNames(game)}
                        </div>
                        <p>Released: {game.released}</p>
                        <div className="container text-justify" id="detail-card-description">
                                {game.description_raw}
                        </div>
                        <div className="developers font-weight-bold top-buffer">
                            {this.developers(game)}
                        </div>
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