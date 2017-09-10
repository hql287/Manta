// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// EXPORTED ACTIONS
// Get All Invoices
export const getInvoices = () => {
  return {
    type: ACTION_TYPES.INVOICE_GET_ALL,
  };
};

// Save an Invoice
export const saveInvoice = data => {
  return {
    type: ACTION_TYPES.INVOICE_SAVE,
    data,
  };
};

// Delete an invoice
export const deleteInvoice = _id => {
  return {
    type: ACTION_TYPES.INVOICE_DELETE,
    _id,
  };
};
