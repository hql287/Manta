import * as ACTION_TYPES from '../constants/actions.jsx';

export const getInitalSettings = () => {
  return {
    type: ACTION_TYPES.GET_INITIAL_SETTINGS,
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
  return {
    type: ACTION_TYPES.SAVE_SETTINGS,
    data,
  };
};
