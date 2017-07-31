import * as ACTION_TYPES from '../constants/actions.jsx';
const appConfig = require('electron').remote.require('electron-settings');

let initialState;
const savedSettings = {
  info: appConfig.get('info'),
  appSettings: appConfig.get('appSettings'),
  printOptions: appConfig.get('printOptions'),
}

initialState = {
  current: savedSettings,
  saved: savedSettings,
};

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Update Settings Info
    case ACTION_TYPES.UPDATE_SETTINGS_INFO: {
      return Object.assign({}, state, {
        current: Object.assign({}, state.current, {
          info: action.data,
        })
      });
    }

    // Update App Settings
    case ACTION_TYPES.UPDATE_APP_SETTINGS: {
      return Object.assign({}, state, {
        current: Object.assign({}, state.current, {
          appSettings: action.data,
        })
      });
    }

    // Update Print Options
    case ACTION_TYPES.UPDATE_PRINT_OPTIONS: {
      return Object.assign({}, state, {
        current: Object.assign({}, state.current, {
          printOptions: action.data,
        })
      });
    }

    // Save All Settings
    case ACTION_TYPES.SAVE_SETTINGS: {
      appConfig.set('info', action.data.info);
      appConfig.set('appSettings', action.data.appSettings);
      appConfig.set('printOptions', action.data.printOptions);
      return Object.assign({}, state, {
        saved: action.data,
      });
    }

    default: {
      return state;
    }
  }
};

export default SettingsReducer;
