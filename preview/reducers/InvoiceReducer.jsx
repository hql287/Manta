// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {};

const InvoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get All Invoices
    case ACTION_TYPES.SET_INVOICE: {
      return Object.assign({}, state, action.data);
    }

    default: {
      return state;
    }
  }
};

export default InvoicesReducer;
