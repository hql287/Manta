// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store';
import i18n from '../i18n/i18n';

// Root Component
import App from './App';
import ErrorBoundary from './components/shared/ErrorBoundary';

// Store
const store = configureStore();

// Render
ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);

// Accepting Hot Updates
module.hot && module.hot.accept();
