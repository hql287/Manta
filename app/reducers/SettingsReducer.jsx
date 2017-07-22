import * as ACTION_TYPES from '../constants/actions.jsx';
const appConfig = require('electron').remote.require('electron-settings');

let initialState;

if (!appConfig.has('settings')) {
  appConfig.set('settings', {});
}

initialState = appConfig.get('settings');

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {

    // Save Settings
    case ACTION_TYPES.SAVE_SETTINGS: {
      appConfig.set('settings', action.data);
      return appConfig.get('settings');
    }

    // Update Settings Info
    case ACTION_TYPES.UPDATE_SETTINGS_INFO: {
      return action.data;
    }

    default: {
      return state;
    }
  }
};

export default SettingsReducer;
