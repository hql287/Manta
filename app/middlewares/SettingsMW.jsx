// Node Libs
const appConfig = require('electron').remote.require('electron-settings');
import sounds from '../../libs/sounds';

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

const InvoicesMW = ({dispatch}) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.SETTINGS_GET_INITIAL: {
      const savedSettings = {
        info: appConfig.get('info'),
        appSettings: appConfig.get('appSettings'),
        printOptions: appConfig.get('printOptions'),
      };
      next(
        Object.assign({}, action, {
          payload: {
            current: savedSettings,
            saved: savedSettings,
          }
        })
      );
      break;
    }

    case ACTION_TYPES.SETTINGS_SAVE: {
      // Sate Settings
      appConfig.set('info', action.payload.info);
      appConfig.set('appSettings', action.payload.appSettings);
      appConfig.set('printOptions', action.payload.printOptions);
      // Reload Sounds Cache
      sounds.preload();
      // Continue
      next(action);
      // Create Notification
      dispatch({
        type: ACTION_TYPES.UI_NOTIFICATION_NEW,
        payload: {
          type: 'success',
          message: 'All Settings Are Saved',
        },
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
