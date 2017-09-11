// Node Libs
const appConfig = require('electron').remote.require('electron-settings');

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

const InvoicesMW = ({ dispatch }) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.SETTINGS_GET_INITIAL: {
      const savedSettings = {
        info: appConfig.get('info'),
        appSettings: appConfig.get('appSettings'),
        printOptions: appConfig.get('printOptions'),
      };
      next(Object.assign({}, action, {
        data: {
          current: savedSettings,
          saved: savedSettings,
        }
      }));
      break;
    }

    case ACTION_TYPES.SETTINGS_SAVE: {
      // Sate Settings
      appConfig.set('info', action.data.info);
      appConfig.set('appSettings', action.data.appSettings);
      appConfig.set('printOptions', action.data.printOptions);
      // Continue
      next(action);
      dispatch({
        type: ACTION_TYPES.UI_NOTIFICATION_NEW,
        payload: {
          type: 'success',
          message: 'All Settings Are Saved'
        }
      });
      break;
    }

    default: {
      next(action);
      break;
    }
  }
};

export default InvoicesMW;
