import * as ACTION_TYPES from '../constants/actions.jsx';
const appConfig = require('electron').remote.require('electron-settings');

export const getInitalSettings = () => {
  const savedSettings = {
    info: appConfig.get('info'),
    appSettings: appConfig.get('appSettings'),
    printOptions: appConfig.get('printOptions'),
  };
  return {
    type: ACTION_TYPES.GET_INITIAL_SETTINGS,
    data: {
      current: savedSettings,
      saved: savedSettings,
    }
  };
};

export const updateSettings = (setting, data) => {
  return {
    type: ACTION_TYPES.UPDATE_SETTINGS,
    setting,
    data,
  };
};

export const saveSettings = data => {
  // Save data
  appConfig.set('info', data.info);
  appConfig.set('appSettings', data.appSettings);
  appConfig.set('printOptions', data.printOptions);
  return {
    type: ACTION_TYPES.SAVE_SETTINGS,
    data,
  };
};
