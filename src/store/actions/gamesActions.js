import Axios from "axios";


export const fetchGames = (pageId)=>{
    return (dispatch,getState)=>{
        Axios.get(`https://api.rawg.io/api/games?page=${pageId}`)
        .then(res => dispatch({type:'FETCH_GAMES', games:res.data}))
        .catch((err)=>{
            dispatch({type:'FETCH_ERROR',err})
        })
    }
}


