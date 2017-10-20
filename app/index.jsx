// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import configureStore from './store';

// Root Component
import App from './App';

// Store
const store = configureStore();

// Render
ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);

// Accepting Hot Updates
module.hot && module.hot.accept();
