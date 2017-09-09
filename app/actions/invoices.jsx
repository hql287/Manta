// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// EXPORTED ACTIONS
// Get All Invoices
export const getInvoices = () => {
  return {
    type: ACTION_TYPES.GET_INVOICES,
  };
};

// Save an Invoice
export const saveInvoice = data => {
  return {
    type: ACTION_TYPES.SAVE_INVOICE,
    data,
  };
};

// Delete an invoice
export const deleteInvoice = _id => {
  return {
    type: ACTION_TYPES.DELETE_INVOICE,
    _id,
  };
};
