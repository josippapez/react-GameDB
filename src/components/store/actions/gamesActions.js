import Axios from "axios";

const url = "https://api.rawg.io/api/games?page=1";

export const fetchGames = (url="https://api.rawg.io/api/games?page=1")=>{
    return (dispatch,getState)=>{
        Axios.get("https://api.rawg.io/api/games?page=1")
        .then(res => console.log(res))
        .then(()=>{
            dispatch({type:'FETCH_GAMES',url});
        }).catch((err)=>{
            dispatch({type:'FETCH_ERROR',err})
        })
    }
}

export const dispatchGames = () =>{
    return{
        type: 'DISPATCH_GAMES'
    }
}