import React from 'react'

function GamesSummary({game}) {
    return (
        <div className="card small hoverable" id="card">
                <div className="card-image z-depth-5">
                    <img src={game.background_image} alt={game.slug}/>
                </div>
                <span className="card-title"><b>{game.name}</b></span>
                <div className="card-content">
                    <p>{game.ratings_count} people rated</p>
                    <p>Rating: {game.rating}</p>
                </div>
                <img src={game.background_image} alt={game.slug} id="bg-image"/>
            </div>
    )
}
export default GamesSummary;