// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import isDev from 'electron-is-dev';

// Root Reducer
import rootReducer from '../reducers';

// 3rd Party MWs
import Logger from 'redux-logger';

// Custom Middleware
import MeasureMW from '../middlewares/MeasureMW';
import FormMW from '../middlewares/FormMW';
import ContactsMW from '../middlewares/ContactsMW';
import InvoicesMW from '../middlewares/InvoicesMW';
import SettingsMW from '../middlewares/SettingsMW';
import UIMiddleware from '../middlewares/UIMiddleware';

// Default Middlewares
const middlewares = [FormMW, ContactsMW, InvoicesMW, SettingsMW, UIMiddleware];

// Dev Mode Middlewares
if (isDev) {
  middlewares.unshift(MeasureMW);
  middlewares.push(Logger);
}
// For translation
import { initialize, addTranslationForLanguage, setActiveLanguage  } from 'react-localize-redux';
// TRANSL: Add languages here
const languages = [
  { name: 'English', code: 'en' }, 
  { name: 'German', code: 'de' }
];
// TRANSL: Add files with translations here
const transEnUs = require('../translations/en_us.json');
const transDe = require('../translations/de.json');

// Redux Devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.dispatch(setActiveLanguage('en'));
  store.dispatch(initialize(languages, { defaultLanguage: 'en' }));
  // TRANSL: Load translation files here
  store.dispatch(addTranslationForLanguage(transEnUs, 'en'));
  store.dispatch(addTranslationForLanguage(transDe, 'de'));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
