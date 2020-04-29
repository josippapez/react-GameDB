const initState={
    games:[
        {id: '1',title:'First title',content:"pdgphkosfksodfkods"},
        {id: '2',title:'Second title',content:"sodgodkfos"},
        {id: '3',title:'Third title',content:"idjosd"}
    ],
    game:{},
    searchResults:[],
    previousPage:null,
    previousGameName:null
}
const games= (state=initState,action) =>{
    switch (action.type) {
        case 'FETCH_GAMES':
            console.log('Fetched games', action.games)
            return {...state, games:action.games, searchResults:[]};
        case 'FETCH_ERROR':
            console.log('Fetch games error', action.err)
            return state;
        case 'FETCH_GAME':
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
        case 'RESET_GAME_DATA':
            console.log("Game data reset",action);
            return {...state,game:{}}
        case 'RESET_DATA':
            console.log("Data reset",action);
            return {games:[],game:{},searchResults:[],previousGameName:null,previousPage:null}
        case 'GET_PREVIOUS_PAGE':
            console.log("Previous page:",action);
            return {...state,previousPage:action.previousPage,previousGameName:action.previousGameName}
        default:
            return state;
    }
}

export default games;