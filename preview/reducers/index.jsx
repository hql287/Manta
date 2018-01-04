import * as ACTION_TYPES from '../constants/actions.jsx';
import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';
const appConfig = require('electron').remote.require('electron-settings');
const invoiceSettings = appConfig.get('invoice');
const profile = appConfig.get('profile');

const initialState = {
  invoice: {},
  profile,
  configs: {
    accentColor: {
      useCustom: false,
      color: '#2CCCE4',
    },
    alignItems: 'middle',
    fontSize: '200',
    showLogo: true,
    showRecipient: true,
    useSymbol: true,
    template: invoiceSettings.template,
    dateFormat: invoiceSettings.dateFormat,
  },
};

const RootReducer = handleActions(
  {
    [ACTION_TYPES.INVOICE_UPDATE]: (state, action) =>
      Object.assign({}, state, {
        invoice: action.payload,
      }),
    [ACTION_TYPES.SETTINGS_UPDATE_CONFIGS]: (state, action) =>
      Object.assign({}, state, {
        configs: Object.assign({}, state.configs, {
          [action.payload.name]: action.payload.value,
        }),
      }),
  },
  initialState
);

export default RootReducer;

// Selectors
const getState = state => state;
export const getConfigs = createSelector(getState, state => state.configs);

export const getInvoice = createSelector(getState, state => state.invoice);

export const getProfile = createSelector(getState, state => state.profile);
