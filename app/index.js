// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

// Root Reducer
import combineReducers from './reducers';

// Root Component
import App from './App';

// 3rd Party MWs
import Logger from 'redux-logger';

// Custom Middleware
import MeasureMW from './middlewares/MeasureMW';
import FormMW from './middlewares/FormMW';
import ContactsMW from './middlewares/ContactsMW';
import InvoicesMW from './middlewares/InvoicesMW';
import SettingsMW from './middlewares/SettingsMW';
import UIMiddleware from './middlewares/UIMiddleware';
import MainProcessMW from './middlewares/MainProcessMW';

const middlewares = [
  MeasureMW,
  FormMW,
  ContactsMW,
  InvoicesMW,
  SettingsMW,
  UIMiddleware,
  MainProcessMW,
  Logger,
];

// Redux Devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store
const store = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

// Render
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
