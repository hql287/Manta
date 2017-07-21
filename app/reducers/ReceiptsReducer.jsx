// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  loaded: false,
  data: [],
};

const ReceiptsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add Item
    case ACTION_TYPES.GET_RECEIPTS: {
      return Object.assign({}, state, {
        loaded: true,
        data: action.receipts,
      });
    }

    // Remove Item
    case ACTION_TYPES.SAVE_RECEIPT: {
      return Object.assign({}, state, {
        data: action.allReceipts,
      });
    }

    // Update Item
    case ACTION_TYPES.DELETE_RECEIPT: {
      return Object.assign({}, state, {
        data: action.remainingReceipts,
      });
    }

    default: {
      return state;
    }
  }
};

export default ReceiptsReducer;
