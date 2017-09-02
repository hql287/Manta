// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {};

const InvoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_INVOICE: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default InvoicesReducer;
