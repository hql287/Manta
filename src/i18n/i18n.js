import i18n from 'i18next'
import isDev from 'electron-is-dev'
import moment from 'moment'
import appConfig from 'electron-settings'

//import { reactI18nextModule } from 'react-i18next'
const defaultLanguage = appConfig.get('general.language')

// Language Files
import de from './de'
import en from './en'
import fr from './fr'
import id from './id'
import it from './it'
import sk from './sk'
import urPK from './ur-PK'
import vi from './vi'
import zhCN from './zh-CN'

i18n.use(reactI18nextModule).init({
  lng: defaultLanguage,
  fallbackLng: 'en',
  debug: isDev,
  defaultNS: 'form',
  resources: {
    de,
    en,
    fr,
    id,
    it,
    sk,
    'ur-PK': urPK,
    vi,
    'zh-CN': zhCN,
  },
  interpolation: {
    function(value, format, lng) {
      if (value instanceof Date) return moment(value).format(format)
      return value
    },
  },
  react: {
    wait: false,
    bindI18n: false,
    bindStore: false,
    nsMode: false,
  },
})

i18n.on('languageChanged', (currentLang) => {
  moment.locale(currentLang)
})

moment.locale(defaultLanguage)

export default i18n
