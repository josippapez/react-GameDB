import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore, createFirestoreInstance } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebaseConfig from "../config/fbConfig";
import reducers from "./reducers/combinedReducers";
import firebase from 'firebase';

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

firebase.initializeApp(firebaseConfig);

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
  ),
);

const rrfProps = {
  firebase,
  config: { userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true },
  dispatch: store.dispatch,
  createFirestoreInstance
}

const persistor = persistStore(store);

export { persistor, store, rrfProps };
