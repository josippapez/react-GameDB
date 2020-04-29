const initState = {
    showGameDetailsModal: false
}
const modals = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_GAME_DETAILS_MODAL':
            return { showGameDetailsModal: !state.showGameDetailsModal };
        default:
            return state;
    }
}

export default modals;