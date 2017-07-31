// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Redux Stuff
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

// Middleware allows action creator to return a function instead of plain object
import ReduxThunk from 'redux-thunk';

// Log Redux action inside console
import Logger from 'redux-logger';

// Root Reducer
import combineReducers from './reducers';

// Create Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const PreviewStore = createStore(
  combineReducers,
  composeEnhancers(applyMiddleware(ReduxThunk, Logger))
);

// Custom Components
import Receipt from './containers/Receipt.jsx';

ReactDOM.render(
  <Provider store={PreviewStore}>
    <Receipt/>
  </Provider>,
  document.getElementById('receiptWrapper')
);
