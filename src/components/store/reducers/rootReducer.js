const initState={
    games:[
        {id: '1',title:'First title',content:"pdgphkosfksodfkods"},
        {id: '2',title:'Second title',content:"sodgodkfos"},
        {id: '3',title:'Third title',content:"idjosd"}
    ]
}
const rootReducer= (state=initState,action) =>{
    switch (action.type) {
        case 'FETCH_GAMES':
            console.log('Fetched games', action.game)
            return state;
        case 'FETCH_ERROR':
            console.log('Fetch games error', action.err)
            return state;
        default:
            return state;
    }
}

export default rootReducer;