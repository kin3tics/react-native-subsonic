import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import thunkMiddleware from 'redux-thunk'
import { server, menu, library, mediaPlayer } from './reducers'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const serverPersistConfig = {
  keyPrefix: '',
  key: 'server',
  storage: storage
}

const menuPersistConfig = {
  keyPrefix: '',
  key: 'menu',
  storage: storage
}
const libraryPersistConfig = {
  keyPrefix: '',
  key: 'library',
  storage: storage
}

const mediaPlayerTransform = createTransform(
  (inboundState, key) => {
    console.log(inboundState, key)
    return {
      ...inboundState
    }
    
  },
  (outboundState, key) => {
    return {
      ...outboundState
    }
  },
  { whitelist: ['mediaPlayer'] }
)

const mediaPlayerPersistConfig = {
  keyPrefix: '',
  key: 'mediaPlayer',
  storage: storage,
  blacklist: ['mediaPlayer', 'isPlaying'],
  transforms: [mediaPlayerTransform]
}

let middlewares = [];
middlewares.push(thunkMiddleware);

const rootReducer = combineReducers({
  server: persistReducer(serverPersistConfig, server),
  menu: persistReducer(menuPersistConfig, menu),
  library: persistReducer(libraryPersistConfig, library),
  mediaPlayer: persistReducer(mediaPlayerPersistConfig, mediaPlayer),
})

//const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);