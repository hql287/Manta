import * as ACTION_TYPES from '../constants/actions.jsx';
import {createSelector} from 'reselect';
import {handleActions} from 'redux-actions';

const InvoicesReducer = handleActions(
  {
    [ ACTION_TYPES.INVOICE_UPDATE ]: (state, action) => action.payload
  },
  {}
);

export default InvoicesReducer;

// Selector
const getInvoiceState = state => state.invoice;
export const getInvoice = createSelector(
  getInvoiceState,
  invoice => invoice
);
