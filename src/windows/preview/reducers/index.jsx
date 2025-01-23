// Libs
import * as ACTION_TYPES from '../constants/actions';
import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';
const appConfig = require('electron').remote.require('electron-settings');
const invoiceSettings = appConfig.get('invoice');
const profileSettings = appConfig.get('profile');
const generalSettings = appConfig.get('general');

const initialState = {
  ui: { language: generalSettings.language },
  invoice: {},
  profile: profileSettings,
  configs: {
    // Set default from settings
    dateFormat: invoiceSettings.dateFormat,
    language: generalSettings.language,
    template: invoiceSettings.template,
    accentColor: '#2CCCE4',
    // Other settings
    logoSize: '20',
    fontSize: '200',
    alignItems: 'middle',
    // Toggle
    showLogo: true,
    useSymbol: true,
    customAccentColor: true,
    showRecipient: true,
  },
};

const RootReducer = handleActions(
  {
    [ACTION_TYPES.INVOICE_UPDATE]: (state, action) =>
      Object.assign({}, state, {
        invoice: action.payload,
        configs: action.payload.configs ? action.payload.configs : state.configs
      }),
    [ACTION_TYPES.UI_CHANGE_LANGUAGE]: (state, action) =>
      Object.assign({}, state, {
        ui: Object.assign({}, state.ui, {
          language: action.payload
        })
      }),
    [ACTION_TYPES.SETTINGS_UPDATE_PROFILE]: (state, action) =>
      Object.assign({}, state, {
        profile: action.payload
      }),
    [ACTION_TYPES.SETTINGS_UPDATE_CONFIGS]: (state, action) =>
      Object.assign({}, state, {
        configs: Object.assign({}, state.configs, {
          [action.payload.name]: action.payload.value,
        }),
      }),
    [ACTION_TYPES.SETTINGS_RELOAD_CONFIGS]: (state, action) => {
      const { profile, invoice, general} = action.payload;
      return Object.assign({}, state, {
        profile,
        configs: Object.assign({}, state.configs, {
          language: general.language,
          template: invoice.template,
          dateFormat: invoice.dateFormat,
        }),
      });
    }
  },
  initialState
);

export default RootReducer;

// Selectors
const getState = state => state;
export const getConfigs = createSelector(getState, state => state.configs);
export const getInvoice = createSelector(getState, state => state.invoice);
export const getProfile = createSelector(getState, state => state.profile);
export const getUILang  = createSelector(getState, state => state.ui.language);
export const getInvoiceLang  = createSelector(getState, state => state.invoice.language);

