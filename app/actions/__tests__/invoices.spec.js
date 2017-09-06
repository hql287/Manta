import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as actions from '../invoices';

it('getInvoices should create GET_INVOICES action', () => {
  expect(actions.getInvoices()).toEqual({
    type: ACTION_TYPES.GET_INVOICES,
  });
});

it('saveInvoice should create SAVE_INVOICE action', () => {
  const invoiceData = {
    _id: 'jon_snow',
    fulname: 'Jon Snow',
    email: 'jon@snow.got',
  };
  expect(actions.saveInvoice(invoiceData)).toEqual({
    type: ACTION_TYPES.SAVE_INVOICE,
    data: invoiceData,
  });
});

it('deleteInvoice should create DELETE_INVOICE action', () => {
  expect(actions.deleteInvoice('jon_snow')).toEqual({
    type: ACTION_TYPES.DELETE_INVOICE,
    _id: 'jon_snow',
  });
});
