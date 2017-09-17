import * as ACTION_TYPES from '../constants/actions.jsx';

export const getInitalSettings = () => {
  return {
    type: ACTION_TYPES.SETTINGS_GET_INITIAL,
  };
};

export const updateSettings = (setting, data) => {
  return {
    type: ACTION_TYPES.SETTINGS_UPDATE,
    payload: {
      setting,
      data,
    }
  };
};

export const saveSettings = data => {
  return {
    type: ACTION_TYPES.SETTINGS_SAVE,
    payload: data,
  };
};
