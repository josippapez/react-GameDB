const initState={
    games:[
        {id:'1', title: "new", content:"oofkgdo"},
        {id:'1', title: "new", content:"oofkgdo"},
        {id:'1', title: "new", content:"oofkgdo"},
        {id:'1', title: "new", content:"oofkgdo"}
    ]
};

async function  gameReducer (state=initState,action){
    console.log("Mapping2!");
    const response = await fetch('https://api.rawg.io/api/games?page=1');
    const myJson = await response.json();
    console.log(myJson);
    return myJson;
}

export default gameReducer;