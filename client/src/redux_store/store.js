import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducers from '../reducers/index';
import logger from "redux-logger";

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducer, {},
    applyMiddleware(...middleware, logger)
);

export const persistor = persistStore(store);



export default store