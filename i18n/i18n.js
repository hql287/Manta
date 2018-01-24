import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

const isDev = require('electron-is-dev');
const appConfig = require('electron-settings');
const defaultLanguage = appConfig.get('general.language');

// Language Files
import fr from './fr/index.js';
import en from './en/index.js';
import vi from './vi/index.js';

i18n
  // Don't use I18nextProvider
  .use(reactI18nextModule)
  .init({
    lng: defaultLanguage,
    fallbackLng: 'en',
    debug: isDev,
    ns: ['form', 'common'],
    defaultNS: 'form',
    // Translations
    resources: {
      en,
      fr,
      vi,
    },
    // React i18next special options (optional)
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });

export default i18n;
