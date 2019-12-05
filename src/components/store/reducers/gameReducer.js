import Axios from "axios";

const initState={
    games:[
        {id:'1', title: "new", content:"oofkgdo"},
        {id:'1', title: "new", content:"oofkgdo"},
        {id:'1', title: "new", content:"oofkgdo"},
        {id:'1', title: "new", content:"oofkgdo"}
    ]
};
const gameReducer =(state=initState,action)=>{
    console.log("Mapping2!");
    Axios.get('https://api.rawg.io/api/games?page=1')
            .then(res=>{
                state=res.data.results
                console.log("state:",state);
            });
    return state;
}

export default gameReducer;