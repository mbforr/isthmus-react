import { createStore, combineReducers } from 'redux';
import mapsettingsReducer from '../reducers/mapsettings';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({mapsettings: mapsettingsReducer}))


export default () => {
  let store = createStore(

    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

// export default
//
//   const store = createStore(
//     persistReducer,
//
//
//   );
//   let persistor = persistStore(store)
//
//   return {store,persistor};
// };
