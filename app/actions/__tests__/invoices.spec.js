import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as actions from '../invoices';

it('getInvoices should create GET_INVOICES action', () => {
  expect(actions.getInvoices()).toEqual({
    type: ACTION_TYPES.INVOICE_GET_ALL,
  });
});

it('saveInvoice should create SAVE_INVOICE action', () => {
  const invoiceData = {
    _id: 'jon_snow',
    fulname: 'Jon Snow',
    email: 'jon@snow.got',
  };
  expect(actions.saveInvoice(invoiceData)).toEqual({
    type: ACTION_TYPES.INVOICE_SAVE,
    payload: {
      invoiceData,
      withPreview: false
    }
  });
  expect(actions.saveInvoice(invoiceData, true)).toEqual({
    type: ACTION_TYPES.INVOICE_SAVE,
    payload: {
      invoiceData,
      withPreview: true
    }
  });
});

it('deleteInvoice should create DELETE_INVOICE action', () => {
  expect(actions.deleteInvoice('jon_snow')).toEqual({
    type: ACTION_TYPES.INVOICE_DELETE,
    payload: 'jon_snow',
  });
});

it('newInvocieFromContact should create INVOICE_NEW_FROM_CONTACT action', () => {
  const contact = {
    id: 'abcxyz',
    name: 'Jon Snow',
    company: 'HBO',
  };
  expect(actions.newInvocieFromContact(contact)).toEqual({
    type: ACTION_TYPES.INVOICE_NEW_FROM_CONTACT,
    payload: contact,
  });
});
