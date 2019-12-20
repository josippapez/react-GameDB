import Axios from "axios";

export var previousPage=null;
export var previousGameName=null;

export const savePreviousPage=(pageId,gameName)=>{
    return(dispatch,getState)=>{
        previousPage=pageId;
        previousGameName=gameName;
        dispatch({type:'GET_PREVIOUS_PAGE',previousPage,previousGameName});
        console.log(previousPage,previousGameName);
        
    }
}

export const fetchGames = (pageId)=>{
    return (dispatch,getState)=>{
        Axios.get(`https://api.rawg.io/api/games?page=${pageId}`)
        .then(res => dispatch({type:'FETCH_GAMES', games:res.data}))
        .catch((err)=>{
            dispatch({type:'FETCH_ERROR',err})
        })
    }
}

export const fetchGameDetail = (gameId)=>{
    return (dispatch,getState)=>{
        Axios.get(`https://api.rawg.io/api/games/${gameId}`)
        .then(res => dispatch({type:'FETCH_GAME', games:res.data})
        )
        .catch((err)=>{
            dispatch({type:'FETCH_GAME_ERROR',err})
        })
    }
}

export const fetchGame = (gameName,pageId)=>{
    return (dispatch,getState)=>{
        Axios.get(`https://api.rawg.io/api/games?page_size=40&page=${pageId}&search=${gameName}`)
        .then(res => dispatch({type:'FETCH_SEARCHED_GAME', games:res.data})
        )
        .catch((err)=>{
            dispatch({type:'FETCH_SEARCHED_GAME_ERROR',err})
        })
    }
}