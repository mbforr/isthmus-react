import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore();

const state = store.getState();

const jsx = (
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
       <AppRouter />
    </PersistGate>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
