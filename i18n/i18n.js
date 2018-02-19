import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

const appConfig = require('electron').remote.require('electron-settings');
const defaultLanguage = appConfig.get('general.language');
const isDev = require('electron-is-dev');
const moment = require('moment');

// Language Files
import fr from './fr';
import en from './en';
import vi from './vi';
import zhCN from './zhCN';

i18n.use(reactI18nextModule).init({
  lng: defaultLanguage,
  fallbackLng: 'en',
  debug: isDev,
  defaultNS: 'form',
  resources: {
    en,
    fr,
    vi,
    zhCN
  },
  interpolation: {
    function(value, format, lng) {
      if (format === 'uppercase') return value.toUpperCase();
      if (value instanceof Date) return moment(value).format(format);
      return value;
    },
  },
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
});

// Keep the language on moment in sync with i18next
i18n.on('languageChanged', lang => {
  moment.locale(lang);
});

export default i18n;
