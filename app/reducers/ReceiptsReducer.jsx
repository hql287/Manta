// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  loaded: false,
  data: [],
};

const ReceiptsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get All Receipts
    case ACTION_TYPES.GET_RECEIPTS: {
      return Object.assign({}, state, {
        loaded: true,
        data: action.data,
      });
    }
    // Save Receipt
    case ACTION_TYPES.SAVE_RECEIPT: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    // Delete A Receipt
    case ACTION_TYPES.DELETE_RECEIPT: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    default: {
      return state;
    }
  }
};

export default ReceiptsReducer;
