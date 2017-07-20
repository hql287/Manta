// Node Libs
import uuidv4 from 'uuid/v4';

// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  rows: [],
};

const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add Item
    case ACTION_TYPES.ADD_ITEM: {
      return Object.assign({}, state, {
        rows: [...state.rows, {id: uuidv4()}],
      });
    }

    // Remove Item
    case ACTION_TYPES.REMOVE_ITEM: {
      return Object.assign({}, state, {
        rows: state.rows.filter(item => item.id !== action.id),
      });
    }

    // Update Item
    case ACTION_TYPES.UPDATE_ITEM: {
      return Object.assign({}, state, {
        rows: state.rows.map(item => {
          if (item.id !== action.data.id) {
            return item;
          }
          return action.data;
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export default ItemsReducer;
