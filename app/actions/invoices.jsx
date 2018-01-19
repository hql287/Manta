import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Get All Invoices
export const getInvoices = createAction(ACTION_TYPES.INVOICE_GET_ALL);

// Save an Invoice
export const saveInvoice = createAction(
  ACTION_TYPES.INVOICE_SAVE,
  invoiceData => invoiceData
);

// Edit an Invoice
export const editInvoice = createAction(
  ACTION_TYPES.INVOICE_EDIT,
  invoiceData => invoiceData
);

export const updateInvoice = createAction(
  ACTION_TYPES.INVOICE_UPDATE,
  (invoiceID, data) => ({ invoiceID, data })
);

// New Invoice from Contact
export const newInvoiceFromContact = createAction(
  ACTION_TYPES.INVOICE_NEW_FROM_CONTACT,
  contact => contact
);

// Delete an invoice
export const deleteInvoice = createAction(
  ACTION_TYPES.INVOICE_DELETE,
  invoiceID => invoiceID
);

// set the status of an invoice (pending/paid/etc.)
export const setInvoiceStatus = createAction(
  ACTION_TYPES.INVOICE_SET_STATUS,
  (invoiceID, status) => ({ invoiceID, status })
);
