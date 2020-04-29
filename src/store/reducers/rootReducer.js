const initState = {
    games: [
        { id: '1', title: 'First title', content: "pdgphkosfksodfkods" },
        { id: '2', title: 'Second title', content: "sodgodkfos" },
        { id: '3', title: 'Third title', content: "idjosd" }
    ],
    game: {},
    searchResults: [],
    previousPage: null,
    previousGameName: null,
    favourites: [],
    fetchedFavouriteGames: [],
    gameIdToShow: null
}
const games = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_GAMES':
            return { ...state, games: action.games, searchResults: [] };
        case 'FETCH_ERROR':
            return state;
        case 'FETCH_GAME':
            return { ...state, game: action.games };
        case 'FETCH_GAME_ERROR':
            return state;
        case 'FETCH_SEARCHED_GAME':
            return { ...state, searchResults: action.games, games: [] };
        case 'FETCH_SEARCHED_GAME_ERROR':
            return state;
        case 'RESET_GAME_DATA':
            return { ...state, game: {} }
        case 'RESET_DATA':
            return { ...state, games: action.games }
        case 'GET_PREVIOUS_PAGE':
            return { ...state, previousPage: action.previousPage, previousGameName: action.previousGameName }
        case 'SET_FAVOURITE':
            return { ...state, favourites: [...new Set([...state.favourites, action.id])] }
        case 'FETCH_FAVOURITE_GAME':
            return { ...state, fetchedFavouriteGames: [...state.fetchedFavouriteGames, action.favouriteGame] }
        case 'SET_GAME_TO_SHOW':
            return { ...state, gameIdToShow: action.gameId }
        case 'RESET_FAVOURITE_DETAILS':
            return { ...state, fetchedFavouriteGames: [] }
        default:
            return state;
    }
}

export default games;