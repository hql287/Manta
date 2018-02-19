import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/invoices';

const InvoicesReducer = handleActions(
  {
    [combineActions(
      Actions.getInvoices,
      Actions.saveInvoice,
      Actions.saveInvoiceConfigs,
      Actions.updateInvoice,
      Actions.deleteInvoice,
      Actions.setInvoiceStatus
    )]: (state, action) => action.payload,
  },
  []
);

export default InvoicesReducer;

// Selector
const getInvoicesState = state => state.invoices;
export const getInvoices = createSelector(
  getInvoicesState,
  invoices => invoices
);
