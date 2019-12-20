import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGameDetail } from "../../store/actions/gamesActions";

class GameDetails extends Component {
    state={
        timer:null,
        metacriticAnimation:false,
        ratingsAnimation:false,
        metacriticVisiblitly:false,
        ratingsVisibility:false
    }
    componentDidMount(){
        this.props.fetch(this.props.match.params.id);
    }
    checkForVideo=(game)=>{
        if(game.clip && game.clip!=null){
            return(
                <video controls src={game.clip.clip} muted/>
            )
        }
    }
    componentWillUnmount(){
        this.props.resetGame();
    }
    alternativeNames=(game)=>{
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
    metacritic=()=>{
        setTimeout(()=>{
            this.setState({
                metacriticAnimation:true,
                metacriticVisiblitly:true
            })
        },1000);
    }
    developers=(game)=>{
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
    ratings=()=>{
        setTimeout(()=>{
            this.setState({
                ratingsAnimation:true,
                ratingsVisibility:true
            })
        },1000);
    }
    render(){
        let { game } = this.props;
        let gridStyle="row row-cols-2";
        if( window.innerWidth<=800){
            gridStyle="row row-cols-1";
        }
        return (
            <div className="detail-card container-xl-1" id="fadein">
                <div className={gridStyle}>
                    <div className="col">
                        <div className="detail-card-image">
                            <img src={game.background_image} alt={game.slug}/>
                        </div>
                        <div className="detail-video-clip top-buffer">
                            {this.checkForVideo(game)}
                        </div>
                    </div>
                    <div className="detail-card-content col jumbotron">
                        {game.metacritic &&
                            <div metacritic={this.metacritic()} 
                            style={{'--width':game.metacritic+'%'}} 
                            className={"square text-white font-weight-bold"+(this.state.metacriticAnimation ? (" animation") : (""))}>
                                <label className={this.state.metacriticVisiblitly ? ("") : ("invisible")}>{game.metacritic}</label>
                            </div>
                        }
                        <p className="detail-card-title font-weight-bold display-4 top-buffer">{game.name}</p>
                        <div id="alternative-name">
                            {this.alternativeNames(game)}
                        </div>
                        <hr className="my-4"/>
                        <p>Released: {game.released}</p>
                        <div className="container text-justify">
                            {game.description_raw}
                        </div>
                        <div className="developers font-weight-bold top-buffer">
                            {this.developers(game)}
                        </div>
                        <ul className={"ratings list-group" + (this.state.ratingsVisibility ? ("") : (" invisible"))}>
                            <p className="ratings text-left">Ratings:</p>
                            {game.ratings && game.ratings.length>0 && game.ratings.map((rating)=>{
                                return(
                                    <li ratings={this.ratings()} 
                                    style={{'--width':rating.percent+'%'}} 
                                    className={"list-group-item text-capitalize p-2"+(this.state.ratingsAnimation ? (" animation"): (""))} 
                                    key={rating.id} 
                                    id={rating.title}>
                                        {rating.title}-{rating.percent}%
                                    </li>
                                    )
                                })
                            }
                        </ul>
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
      fetch: (gameId) => dispatch(fetchGameDetail(gameId)),
      resetGame: ()=>dispatch({type:'RESET_GAME_DATA'})
    };
  };
export default connect(mapStateToProps, mapStateToDispatch)(GameDetails);