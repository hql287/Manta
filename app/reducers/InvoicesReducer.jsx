// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  loaded: false,
  data: [],
};

const InvoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get All Invoices
    case ACTION_TYPES.INVOICE_GET_ALL: {
      return Object.assign({}, state, {
        loaded: true,
        data: action.payload,
      });
    }
    // Save Invoice
    case ACTION_TYPES.INVOICE_SAVE: {
      return Object.assign({}, state, {
        data: action.payload,
      });
    }
    // Delete A Invoice
    case ACTION_TYPES.INVOICE_DELETE: {
      return Object.assign({}, state, {
        data: action.payload,
      });
    }
    default: {
      return state;
    }
  }
};

export default InvoicesReducer;
