// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {};

const ReceiptsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get All Receipts
    case ACTION_TYPES.SET_RECEIPT: {
      return Object.assign({}, state, action.data);
    }

    default: {
      return state;
    }
  }
};

export default ReceiptsReducer;
