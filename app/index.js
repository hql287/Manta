// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

// Root Reducer
import combineReducers from './reducers';

// Root Component
import App from './App';

// Middleware
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
import ContactsMW from './middlewares/ContactsMW';
import InvoicesMW from './middlewares/InvoicesMW';
import SettingsMW from './middlewares/SettingsMW';
import MeasureMW from './middlewares/MeasureMW';
import UIMiddleware from './middlewares/UIMiddleware';

const middlewares = [
  MeasureMW,
  ContactsMW,
  InvoicesMW,
  SettingsMW,
  UIMiddleware,
  ReduxThunk,
  Logger,
];

// Redux Devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store
const AppStore = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

// Render
ReactDOM.render(
  <Provider store={AppStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
