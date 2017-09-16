// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

// Root Reducer
import combineReducers from './reducers';

// Middleware
import Logger from 'redux-logger';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store
const store = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(Logger))
);

// Components
import Viewer from './containers/Viewer';

ReactDOM.render(
  <Provider store={store}>
    <Viewer/>
  </Provider>,
  document.getElementById('root')
);
