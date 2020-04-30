import Axios from "axios";

import { SHOW_GAME_DETAILS_MODAL } from "../actionTypes/gamesActions";

var previousPage = null;
var previousGameName = null;

export const incrementPage = () => {
    return (dispatch, getState) => {
        previousPage = getState().games.pageId;
        dispatch({ type: 'INCREMENT_PAGE' });
    }
}

export const decrementPage = () => {
    return (dispatch, getState) => {
        previousPage = getState().games.pageId;
        dispatch({ type: 'DECREMENT_PAGE' });
    }
}

export const setPage = (pageId) => {
    return (dispatch, getState) => {
        previousPage = getState().games.pageId;
        dispatch({ type: 'SET_PAGE', pageId });
    }
}

export const savePreviousPage = (pageId, gameName) => {
    return (dispatch, getState) => {
        previousPage = pageId;
        previousGameName = gameName;
        dispatch({ type: 'GET_PREVIOUS_PAGE', previousPage, previousGameName });
    }
}

export const fetchGames = (pageId) => {
    return (dispatch, getState) => {
        Axios.get(`https://api.rawg.io/api/games?page=${pageId}`)
            .then(res => dispatch({ type: 'FETCH_GAMES', games: res.data }))
            .catch((err) => {
                dispatch({ type: 'FETCH_ERROR', err })
            })
    }
}

export const fetchGameDetail = (gameId) => {
    return (dispatch, getState) => {
        Axios.get(`https://api.rawg.io/api/games/${gameId}`)
            .then(res => dispatch({ type: 'FETCH_GAME', games: res.data })
            )
            .catch((err) => {
                dispatch({ type: 'FETCH_GAME_ERROR', err })
            })
    }
}

export const fetchGame = (gameName, pageId) => {
    return (dispatch, getState) => {
        Axios.get(`https://api.rawg.io/api/games?page_size=40&page=${pageId}&search=${gameName}`)
            .then(res => dispatch({ type: 'FETCH_SEARCHED_GAME', games: res.data })
            )
            .catch((err) => {
                dispatch({ type: 'FETCH_SEARCHED_GAME_ERROR', err })
            })
    }
}

export const resetGame = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'RESET_GAME_DATA' })
    }
}

export const addToFavourites = (id) => {
    return (dispatch) => {
        dispatch({ type: 'SET_FAVOURITE', id })
    }
}

export const resetData = () => {
    return (dispatch, getState) => {
        Axios.get(`https://api.rawg.io/api/games?page=1`)
            .then(res => dispatch({ type: 'RESET_DATA', games: res.data }))
            .catch((err) => {
                dispatch({ type: 'FETCH_ERROR', err })
            })
    }
}

export const fetchFavouriteDetails = (gameId) => {
    return (dispatch, getState) => {
        Axios.get(`https://api.rawg.io/api/games/${gameId}`)
            .then(res => dispatch({ type: 'FETCH_FAVOURITE_GAME', favouriteGame: res.data })
            )
            .catch((err) => {
                dispatch({ type: 'FETCH_GAME_ERROR', err })
            })
    }
}

export const setGameToShow = (gameId) => {
    return (dispatch) => {
        dispatch({ type: 'SET_GAME_TO_SHOW', gameId })
    }
}
export const removeFavouriteDetails = () => {
    return (dispatch) => {
        dispatch({ type: 'RESET_FAVOURITE_DETAILS' })
    }
}

export const showGameDetailsModal = () => ({
    type: SHOW_GAME_DETAILS_MODAL
});