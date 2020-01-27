import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  keyPrefix: '',
  key: 'root',
  storage: storage
}

let middlewares = [];
middlewares.push(thunkMiddleware);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);