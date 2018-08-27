import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from '../reducers/reducers';
import logger from 'redux-logger';
//import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

// const persistedReducer = persistReducer(persistConfig, combineReducers(reducers))

export default () => {
  let store = createStore(
    combineReducers(reducers),
    applyMiddleware(logger)
  )
  // let persistor = persistStore(store)
  return store
}
