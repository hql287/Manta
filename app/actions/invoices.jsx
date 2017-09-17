// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Invoices
export const getInvoices = () => {
  return {
    type: ACTION_TYPES.INVOICE_GET_ALL,
  };
};

// Save an Invoice
export const saveInvoice = (invoiceData, withPreview=false) => {
  return {
    type: ACTION_TYPES.INVOICE_SAVE,
    payload: { invoiceData, withPreview }
  };
};

// New Invoice from Contact
export const newInvocieFromContact = contact => {
  return {
    type: ACTION_TYPES.INVOICE_NEW_FROM_CONTACT,
    payload: contact,
  };
};

// Delete an invoice
export const deleteInvoice = contactID => {
  return {
    type: ACTION_TYPES.INVOICE_DELETE,
    payload: contactID
  };
};
