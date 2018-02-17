import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

const appConfig = require('electron').remote.require('electron-settings');
const defaultLanguage = appConfig.get('general.language');
const isDev = require('electron-is-dev');
const moment = require('moment');

// Language Files
import en from './en';
import ko from './ko';
import vi from './vi';
import zhCN from './zh-CN';

i18n.use(reactI18nextModule).init({
  lng: defaultLanguage,
  fallbackLng: 'en',
  debug: isDev,
  defaultNS: 'form',
  resources: {
    en,
    ko,
    vi,
    "zh-CN": zhCN
  },
  interpolation: {
    function(value, format, lng) {
      if (value instanceof Date) return moment(value).format(format);
      return value;
    },
  },
  react: {
    wait: false,
    bindI18n: false,
    bindStore: false,
    nsMode: false,
  },
});

export default i18n;
