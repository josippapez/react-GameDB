import React from 'react'

function GamesSummary({game}) {
    return (
        <div className="card hoverable" id="card">
                <div className="card-image z-depth-5">
                    <img src={game.background_image} alt={game.slug}/>
                </div>
                <span className="card-title"><b><b>{game.name}</b></b></span>
                <div className="card-content">
                    <p><b>{game.ratings_count} people rated</b></p>
                    <p><b>Rating: {game.rating}</b></p>
                </div>
                <img src={game.background_image} alt={game.slug} id="bg-image"/>
            </div>
    )
}
export default GamesSummary;