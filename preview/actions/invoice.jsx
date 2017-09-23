import {createAction} from 'redux-actions';
import * as ACTION_TYPES from '../constants/actions.jsx';

export const updateInvoice = createAction(
  ACTION_TYPES.INVOICE_UPDATE,
  invoiceData => invoiceData
);
