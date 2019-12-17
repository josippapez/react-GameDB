import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGameDetail } from "../../store/actions/gamesActions";

class GameDetails extends Component {
    state={
        timer:null
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
        this.props.reset();
        clearTimeout(this.timer);
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
    metacritic=(game)=>{
        this.timer=setTimeout(()=>{
            if(game.metacritic!=null){
                var element = document.getElementById('metacritic');
                element.classList.add("animation");
                element.style.setProperty('--width',`${game.metacritic}%`); 
                element=document.getElementById('metacritic-number');
                element.classList.remove("invisible");    
            }
        },1000);
        if(game.metacritic!=null){
            return(
                <div className="square text-white font-weight-bold" id="metacritic">
                    <label className="invisible" id="metacritic-number">{game.metacritic}</label>
                </div>
            )
        }
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
    ratings=(game)=>{
        if(game.ratings && game.ratings.length>0){
            return(
                <p>
                {game.ratings.map((rating)=>{
                    return(
                        <li className="list-group-item text-capitalize p-2" key={rating.id}>{rating.title}<br></br>Rated: {rating.count} || {rating.percent}%</li>
                    )
                })}
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
                    <div className="detail-card-content col jumbotron">
                        {this.metacritic(game)}
                        <p className="detail-card-title font-weight-bold display-4">{game.name}</p>
                        <div id="alternative-name">
                            {this.alternativeNames(game)}
                        </div>
                        <hr className="my-4"/>
                        <p>Released: {game.released}</p>
                        <div className="container text-justify" id="detail-card-description">
                            {game.description_raw}
                        </div>
                        <div className="developers font-weight-bold top-buffer">
                            {this.developers(game)}
                        </div>
                        <p className="ratings text-left">Ratings:</p>
                        <ul className="ratings list-group float-left list-unstyled">
                            {this.ratings(game)}
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
      reset: ()=>dispatch({type:'RESET_DATA'})
    };
  };
export default connect(mapStateToProps, mapStateToDispatch)(GameDetails);