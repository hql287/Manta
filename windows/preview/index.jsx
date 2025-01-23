// Prevent window to open dropped file
require('../libs/dragNdrop.js');

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import i18n from '../i18n/i18n';
import ErrorBoundary from '../app/components/shared/ErrorBoundary';

// Root Reducer
import combineReducers from './reducers';

// Root Component
import Viewer from './Viewer';

// Middleware
import Logger from 'redux-logger';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Store
const store = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(Logger))
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <ErrorBoundary>
        <Viewer />
      </ErrorBoundary>
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);

// Accepting Hot Updates
module.hot && module.hot.accept();
