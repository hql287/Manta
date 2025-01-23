import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

export const updateInvoice = createAction(
  ACTION_TYPES.INVOICE_UPDATE,
  invoiceData => invoiceData
);

export const updateConfigs = createAction(
  ACTION_TYPES.SETTINGS_UPDATE_CONFIGS,
  configs => configs
);

export const updateProfile = createAction(
  ACTION_TYPES.SETTINGS_UPDATE_PROFILE,
  profile => profile
);

export const changeUILanguage = createAction(
  ACTION_TYPES.UI_CHANGE_LANGUAGE,
  language => language
);

export const reloadConfigs = createAction(
  ACTION_TYPES.SETTINGS_RELOAD_CONFIGS,
  newConfigs => newConfigs
);
