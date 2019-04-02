import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { defineCustomElements } from '@carto/airship-components/dist/loader';

// defineCustomElements(window)

const store  = configureStore();

//const state = store.getState();

const jsx = (
  <Provider store={store}>
       <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
