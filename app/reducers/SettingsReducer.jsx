import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  loaded: false,
};

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Initial Settings
    case ACTION_TYPES.SETTINGS_GET_INITIAL: {
      return Object.assign({}, action.data, {
        loaded: true,
      });
    }

    // Update Settings
    case ACTION_TYPES.SETTINGS_UPDATE: {
      return Object.assign({}, state, {
        current: Object.assign({}, state.current, {
          [action.setting]: action.data,
        }),
      });
    }

    // Save All Settings
    case ACTION_TYPES.SETTINGS_SAVE: {
      return Object.assign({}, state, {
        saved: action.data,
      });
    }

    // Default Case
    default: {
      return state;
    }
  }
};

export default SettingsReducer;
