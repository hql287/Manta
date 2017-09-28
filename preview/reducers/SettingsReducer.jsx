const appConfig = require('electron').remote.require('electron-settings');
import * as ACTION_TYPES from '../constants/actions.jsx';
import {createSelector} from 'reselect';
import {handleActions} from 'redux-actions';

const initialState = {
  template: appConfig.get('printOptions.template'),
  configs: {
    accentColor: {
      r: 55,
      g: 214,
      b: 122,
      a: 1,
    },
    alignItems: 'middle',
    fontSize: '200',
    showLogo: false,
    showRecipient: true,
    useSymbol: true,
  }
};

const SettingsReducer = handleActions(
  {
    [ACTION_TYPES.SETTINGS_UPDATE_TEMPLATE]: (state, action) =>
      Object.assign({}, state, {
        template: action.payload
      }),
    [ACTION_TYPES.SETTINGS_UPDATE_CONFIGS]: (state, action) =>
      Object.assign({}, state, {
        configs: Object.assign({}, state.configs, {
          [action.payload.name]: action.payload.value
        })
      }),
  },
  initialState
);

export default SettingsReducer;

// Selectors Inputs
const getSettingsState = state => state.settings;

// Selectors
export const getTemplate = createSelector(
  getSettingsState,
  settings => settings.template
);

export const getConfigs = createSelector(
  getSettingsState,
  settings => settings.configs
);
