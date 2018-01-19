// Node Libs
const appConfig = require('electron').remote.require('electron-settings');
import sounds from '../../libs/sounds';
const ipc = require('electron').ipcRenderer;

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

const SettingsMW = ({ dispatch }) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.SETTINGS_GET_INITIAL: {
      const savedSettings = {
        profile: appConfig.get('profile'),
        invoice: appConfig.get('invoice'),
        general: appConfig.get('general'),
      };
      return next(
        Object.assign({}, action, {
          payload: {
            current: savedSettings,
            saved: savedSettings,
          },
        })
      );
    }

    case ACTION_TYPES.SETTINGS_SAVE: {
      // Sate Settings
      appConfig.set('profile', action.payload.profile);
      appConfig.set('invoice', action.payload.invoice);
      appConfig.set('general', action.payload.general);
      // Reload Sounds Cache
      sounds.preload();
      // Notify previewWindow to update
      ipc.send('update-preview-window', action.payload);
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
      return next(action);
    }
  }
};

export default SettingsMW;
