import React from 'react'

function GamesSummary({game}) {
    return (
        <div className="card small hoverable">
                <div className="card-image z-depth-3">
                    <img src={game.background_image} alt={game.slug}/>
                </div>
                <span className="card-title black-text">{game.name}</span>
                <div className="card-content">
                    <p>Rating: {game.rating}</p>
                </div>
            </div>
    )
}
export default GamesSummary;