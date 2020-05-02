import { combineReducers } from "redux";

import games from "./rootReducer";
import modals from "./modalReducer";
import authReducer from './authReducer';
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const reducers = combineReducers({
    games,
    modals,
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default reducers;