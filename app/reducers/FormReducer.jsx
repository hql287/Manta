// Node Libs
import uuidv4 from 'uuid/v4';

// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  rows: [{id: uuidv4()}],
  discount: {},
  note: '',
};

const FormReducer = (state = initialState, action) => {
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

    // Update Discount
    case ACTION_TYPES.UPDATE_DISCOUNT_AMOUNT: {
      return Object.assign({}, state, {
        discount: Object.assign({}, state.discount, {
          amount: action.data,
        }),
      });
    }

    // Update Discount
    case ACTION_TYPES.UPDATE_DISCOUNT_TYPE: {
      return Object.assign({}, state, {
        discount: Object.assign({}, state.discount, {
          type: action.data,
        }),
      });
    }

    // Update Note
    case ACTION_TYPES.UPDATE_NOTE: {
      return Object.assign({}, state, {
        note: action.data,
      });
    }

    // Clear Form Data
    case ACTION_TYPES.CLEAR_FORM: {
      return {
        rows: [{id: uuidv4()}],
        discount: {},
        note: '',
      };
    }

    default: {
      return state;
    }
  }
};

export default FormReducer;
