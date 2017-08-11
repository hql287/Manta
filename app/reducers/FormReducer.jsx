// Node Libs
import uuidv4 from 'uuid/v4';
const appConfig = require('electron').remote.require('electron-settings');

// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  recipient: {
    type: null,
    select: {},
    new: {},
  },
  rows: [{id: uuidv4()}],
  discount: {
    amount: 0,
    type: 'percentage',
  },
  currency: appConfig.get('appSettings').currency,
  note: '',
};

const FormReducer = (state = initialState, action) => {
  switch (action.type) {

    // Update recipient
    case ACTION_TYPES.UPDATE_RECIPIENT: {
      return Object.assign({}, state, {
        recipient: action.data
      });
    }

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

    // Update Currency
    case ACTION_TYPES.UPDATE_CURRENCY: {
      return Object.assign({}, state, {
        currency: action.data,
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
        recipient: {
          type: null,
          select: {},
          new: {},
        },
        rows: [{id: uuidv4()}],
        discount: {
          amount: 0,
          type: 'percentage',
        },
        currency: appConfig.get('appSettings').currency,
        note: '',
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

export default FormReducer;
