// Node Libs
import uuidv4 from 'uuid/v4';
const appConfig = require('electron').remote.require('electron-settings');

// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  recipient: {
    newRecipient: true,
    select: {},
    new: {},
  },
  rows: [{id: uuidv4()}],
  dueDate:  { required: false },
  currency: { required: false },
  discount: { required: false },
  vat:      { required: false },
  note:     { required: false },
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

    // Move Row Item
    case ACTION_TYPES.MOVE_ROW: {
      const { dragIndex, hoverIndex } = action;
      const dragRow = state.rows[dragIndex];
      let newRows = state.rows;
      newRows.splice(dragIndex, 1);
      newRows.splice(hoverIndex, 0, dragRow);
      return Object.assign({}, state, {
        rows: newRows,
      });
    }

    // Update Field Data
    case ACTION_TYPES.UPDATE_FIELD_DATA: {
      switch(action.field) {

        case 'dueDate': {
          return Object.assign({}, state, {
            dueDate: Object.assign({}, state.dueDate, {
              selectedDate: action.data,
            })
          });
        }

        case 'currency': {
          return Object.assign({}, state, {
            currency: Object.assign({}, state.currency, {
              selectedCurrency: action.data,
            })
          });
        }

        case 'discount': {
          return Object.assign({}, state, {
            discount: Object.assign({}, state.discount, {
              amount: action.data.amount,
              type: action.data.type,
            })
          });
        }

        case 'vat': {
          return Object.assign({}, state, {
            vat: Object.assign({}, state.vat, {
              amount: action.data.amount,
            })
          });
        }

        case 'note': {
          return Object.assign({}, state, {
            note: Object.assign({}, state.note, {
              content: action.data.content,
            })
          });
        }

        default: {
          return state;
        }

      }
    }

    // Clear Form Data
    case ACTION_TYPES.CLEAR_FORM: {
      return {
        recipient: {
          newRecipient: true,
          select: {},
          new: {},
        },
        rows: [{id: uuidv4()}],
        dueDate:  { required: false },
        currency: { required: false },
        discount: { required: false },
        vat:      { required: false },
        note:     { required: false },
      }
    }

    // Toggle Field
    case ACTION_TYPES.TOGGLE_FIELD: {
      return Object.assign({}, state, {
        [action.field]: Object.assign({}, state[action.field], {
          required: !state[action.field].required,
        })
      });
    }

    // Default
    default: {
      return state;
    }
  }
};

export default FormReducer;
