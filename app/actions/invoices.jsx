import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

export const getInvoices = createAction(ACTION_TYPES.INVOICE_GET_ALL);

export const saveInvoice = createAction(
  ACTION_TYPES.INVOICE_SAVE,
  invoiceData => invoiceData
);

export const duplicateInvoice = createAction(
  ACTION_TYPES.INVOICE_DUPLICATE,
  invoiceData => invoiceData
);

export const newInvoiceFromContact = createAction(
  ACTION_TYPES.INVOICE_NEW_FROM_CONTACT,
  contact => contact
);

export const deleteInvoice = createAction(
  ACTION_TYPES.INVOICE_DELETE,
  invoiceID => invoiceID
);

export const editInvoice = createAction(
  ACTION_TYPES.INVOICE_EDIT,
  invoiceData => invoiceData
);

export const updateInvoice = createAction(
  ACTION_TYPES.INVOICE_UPDATE,
  updatedInvoice => updatedInvoice
);

export const setInvoiceStatus = createAction(
  ACTION_TYPES.INVOICE_SET_STATUS,
  (invoiceID, status) => ({ invoiceID, status })
);

export const saveInvoiceConfigs = createAction(
  ACTION_TYPES.INVOICE_CONFIGS_SAVE,
  (invoiceID, configs) => ({ invoiceID, configs })
);
