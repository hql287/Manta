// Node Libs
const appConfig = require('electron').remote.require('electron-settings');

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

const InvoicesMW = () => next => action => {
  switch (action.type) {
    case ACTION_TYPES.GET_INITIAL_SETTINGS: {
      const savedSettings = {
        info: appConfig.get('info'),
        appSettings: appConfig.get('appSettings'),
        printOptions: appConfig.get('printOptions'),
      };
      next({
        type: ACTION_TYPES.GET_INITIAL_SETTINGS,
        data: {
          current: savedSettings,
          saved: savedSettings,
        },
      });
      break;
    }

    case ACTION_TYPES.SAVE_SETTINGS: {
      // Sate Settings
      appConfig.set('info', action.data.info);
      appConfig.set('appSettings', action.data.appSettings);
      appConfig.set('printOptions', action.data.printOptions);
      // Continue
      next(action);
      break;
    }

    default: {
      next(action);
      break;
    }
  }
};

export default InvoicesMW;
