// Node Libs
import uuidv4 from 'uuid/v4';

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
  settingsOpen: false,
};

const FormReducer = (state = initialState, action) => {
  switch (action.type) {
    // Update recipient
    case ACTION_TYPES.FORM_RECIPIENT_UPDATE: {
      return Object.assign({}, state, {
        recipient: action.data
      });
    }

    // Add Item
    case ACTION_TYPES.FORM_ITEM_ADD: {
      return Object.assign({}, state, {
        rows: [...state.rows, {id: uuidv4()}],
      });
    }

    // Remove Item
    case ACTION_TYPES.FORM_ITEM_REMOVE: {
      return Object.assign({}, state, {
        rows: state.rows.filter(item => item.id !== action.id),
      });
    }

    // Update Item
    case ACTION_TYPES.FORM_ITEM_UPDATE: {
      return Object.assign({}, state, {
        rows: state.rows.map(item =>
          (item.id !== action.data.id)
            ? item
            : action.data
        ),
      });
    }

    // Move Row Item
    case ACTION_TYPES.FORM_ITEM_MOVE: {
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
    case ACTION_TYPES.FORM_FIELD_UPDATE_DATA: {
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
    case ACTION_TYPES.FORM_CLEAR: {
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
        settingsOpen: false,
      };
    }

    // Toggle Field
    case ACTION_TYPES.FORM_FIELD_TOGGLE: {
      return Object.assign({}, state, {
        [action.field]: Object.assign({}, state[action.field], {
          required: !state[action.field].required,
        })
      });
    }

    // Toggle Settings
    case ACTION_TYPES.FORM_SETTING_TOGGLE: {
      const newState = action.payload.state;
      return Object.assign({}, state, {
        settingsOpen: newState !== undefined ? newState : !state.settingsOpen
      });
    }

    // Default
    default: {
      return state;
    }
  }
};

export default FormReducer;
