const initState={
    games:[
        {id: '1',title:'First title',content:"pdgphkosfksodfkods"},
        {id: '2',title:'Second title',content:"sodgodkfos"},
        {id: '3',title:'Third title',content:"idjosd"}
    ],
    game:{id: '1', name:'Name goes here', content:'Content goes here'}
}
const rootReducer= (state=initState,action) =>{
    switch (action.type) {
        case 'FETCH_GAMES':
            console.log('Fetched games', action.games)
            return {...state, games:action.games};
        case 'FETCH_ERROR':
            console.log('Fetch games error', action.err)
            return state;
        case 'FETCH_GAME':
            console.log('Fetched game', action.games)
            return {...state, game:action.games};
        case 'FETCH_GAME_ERROR':
            console.log('Fetch games error', action.err)
            return state;
        default:
            return state;
    }
}

export default rootReducer;