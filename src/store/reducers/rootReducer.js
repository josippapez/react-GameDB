const initState={
    games:[
        {id: '1',title:'First title',content:"pdgphkosfksodfkods"},
        {id: '2',title:'Second title',content:"sodgodkfos"},
        {id: '3',title:'Third title',content:"idjosd"}
    ],
    game:{},
    searchResults:[]
}
const rootReducer= (state=initState,action) =>{
    switch (action.type) {
        case 'FETCH_GAMES':
            console.log('Fetched games', action.games)
            return {...state, games:action.games, searchResults:[]};
        case 'FETCH_ERROR':
            console.log('Fetch games error', action.err)
            return state;
        case 'FETCH_GAME':
            console.log('Fetched game', action.games)
            return {...state, game:action.games};
        case 'FETCH_GAME_ERROR':
            console.log('Fetch games error', action.err)
            return state;
        case 'FETCH_SEARCHED_GAME':
            console.log('Fetched searched game', action.games)
            return {...state, searchResults:action.games, games:[]};
        case 'FETCH_SEARCHED_GAME_ERROR':
            console.log('Fetch searched games error', action.err)
            return state;
        case 'RESET_DATA':
            console.log("Data reset",action);
            return {games:[],game:{},searchResults:[]}
        default:
            return state;
    }
}

export default rootReducer;