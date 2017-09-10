import InvoicesReducer from '../InvoicesReducer';
import * as ACTION_TYPES from '../../constants/actions.jsx';

const initialState = {loaded: false, data: []};

describe('Invoices Reducer', () => {
  it('should handle initial state', () => {
    expect(InvoicesReducer(undefined, {})).toEqual({
      loaded: false,
      data: [],
    });
  });

  it('should handle get all invoices', () => {
    const allInvoices = [
      {_id: 1, client: 'Tywin'},
      {_id: 2, client: 'Jaime'},
      {_id: 3, client: 'Cercie'},
    ];
    expect(
      InvoicesReducer(initialState, {
        type: ACTION_TYPES.INVOICE_GET_ALL,
        data: allInvoices,
      }),
    ).toEqual(
      Object.assign({}, initialState, {
        loaded: true,
        data: allInvoices,
      }),
    );
  });

  it('should handle save invoice', () => {
    const newInvoices = [
      {_id: 1, client: 'Tywin'},
      {_id: 2, client: 'Jaime'},
      {_id: 3, client: 'Cercie'},
      {_id: 4, client: 'Tyrion'},
    ];
    expect(
      InvoicesReducer(initialState, {
        type: ACTION_TYPES.INVOICE_SAVE,
        data: newInvoices,
      }),
    ).toEqual(
      Object.assign({}, initialState, {
        data: newInvoices,
      }),
    );
  });

  it('should handle get delete invoice', () => {
    const remainingInvoices = [
      {_id: 2, client: 'Jaime'},
      {_id: 3, client: 'Cercie'},
      {_id: 4, client: 'Tyrion'},
    ];
    expect(
      InvoicesReducer(initialState, {
        type: ACTION_TYPES.INVOICE_DELETE,
        data: remainingInvoices,
      }),
    ).toEqual(
      Object.assign({}, initialState, {
        data: remainingInvoices,
      }),
    );
  });
});
