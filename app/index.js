// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Redux Stuff
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

// Middleware allows action creator to return a function instead of plain object
import ReduxThunk from 'redux-thunk';
import ContactsMW from './middlewares/ContactsMW';
import InvoicesMW from './middlewares/InvoicesMW';
import SettingsMW from './middlewares/SettingsMW';

// Log Redux action inside console
import Logger from 'redux-logger';

// Root Reducer
import combineReducers from './reducers';

// Integrate Redux Devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store
const AppStore = createStore(
  combineReducers,
  composeEnhancers(
    applyMiddleware(
      ContactsMW,
      InvoicesMW,
      SettingsMW,
      ReduxThunk,
      Logger
    )
  )
);

// Main App
import App from './App';

// Render App
ReactDOM.render(
  <Provider store={AppStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
