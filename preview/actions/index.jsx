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
