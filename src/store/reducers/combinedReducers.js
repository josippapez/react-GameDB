import { combineReducers } from "redux";

import games from "./rootReducer";
import modals from "./modalReducer";

const reducers = combineReducers({
    games,
    modals
})

export default reducers;