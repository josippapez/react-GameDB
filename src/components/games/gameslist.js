import React from 'react'
import GamesSummary from './gamessummary'
import {Link} from 'react-router-dom'
function GameList({games}) {
    console.log({games});
    return (
        <div className="game-list section">
            <div className="row">  
            {games.games && games.games.map(game=>{
                return (
                    <div className="col s3 m3" key={game.id}>
                    <Link to={'/game/'+ game.id}>
                        <GamesSummary game={game}/>
                    </Link>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
export default GameList;