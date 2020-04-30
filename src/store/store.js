import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import reducers from "./reducers/combinedReducers";

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);


const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware),
);

const persistor = persistStore(store);

export { persistor, store };
