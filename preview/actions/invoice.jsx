import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Invoices
export const setInvoice = invoiceData => {
  return {
    type: ACTION_TYPES.SET_INVOICE,
    data: invoiceData,
  };
};
