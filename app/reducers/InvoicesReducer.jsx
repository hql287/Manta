// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  loaded: false,
  data: [],
};

const InvoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get All Invoices
    case ACTION_TYPES.GET_INVOICES: {
      return Object.assign({}, state, {
        loaded: true,
        data: action.data,
      });
    }
    // Save Invoice
    case ACTION_TYPES.SAVE_INVOICE: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    // Delete A Invoice
    case ACTION_TYPES.DELETE_INVOICE: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    default: {
      return state;
    }
  }
};

export default InvoicesReducer;
