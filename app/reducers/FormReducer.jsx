import * as ACTION_TYPES from '../constants/actions.jsx';
import {handleActions} from 'redux-actions';
import {createSelector} from 'reselect';

const initialState = {
  recipient: {
    newRecipient: true,
    select: {},
    new: {},
  },
  rows: [],
  dueDate:  { required: false },
  currency: { required: false },
  discount: { required: false },
  vat:      { required: false },
  note:     { required: false },
  settingsOpen: false,
};

const FormReducer = handleActions(
  {
    [ACTION_TYPES.FORM_RECIPIENT_UPDATE]: (state, action) =>
      Object.assign({}, state, {
        recipient: action.payload
      }),

    [ACTION_TYPES.FORM_ITEM_ADD]: (state, action) =>
      Object.assign({}, state, {
        rows: [...state.rows, action.payload],
      }),

    [ACTION_TYPES.FORM_ITEM_REMOVE]: (state, action) =>
      Object.assign({}, state, {
        rows: state.rows.filter(item => item.id !== action.payload),
      }),

    [ACTION_TYPES.FORM_ITEM_UPDATE]: (state, action) =>
      Object.assign({}, state, {
        rows: state.rows.map(item =>
          (item.id !== action.payload.id)
            ? item
            : action.payload
        ),
      }),

    [ACTION_TYPES.FORM_ITEM_MOVE]: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragRow = state.rows[dragIndex];
      let newRows = state.rows;
      newRows.splice(dragIndex, 1);
      newRows.splice(hoverIndex, 0, dragRow);
      return Object.assign({}, state, {
        rows: newRows,
      });
    },

    [ACTION_TYPES.FORM_FIELD_UPDATE_DATA]: (state, action) => {
      const {field, data} = action.payload;
      switch(field) {
        case 'dueDate': {
          return Object.assign({}, state, {
            dueDate: Object.assign({}, state.dueDate, {
              selectedDate: data,
            })
          });
        }

        case 'currency': {
          return Object.assign({}, state, {
            currency: Object.assign({}, state.currency, {
              selectedCurrency: data,
            })
          });
        }

        case 'discount': {
          return Object.assign({}, state, {
            discount: Object.assign({}, state.discount, {
              amount: data.amount,
              type: data.type,
            })
          });
        }

        case 'vat': {
          return Object.assign({}, state, {
            vat: Object.assign({}, state.vat, {
              amount: data.amount,
            })
          });
        }

        case 'note': {
          return Object.assign({}, state, {
            note: Object.assign({}, state.note, {
              content: data.content,
            })
          });
        }

        default: {
          return state;
        }
      }
    },

    [ACTION_TYPES.FORM_FIELD_TOGGLE]: (state, action) =>
      Object.assign({}, state, {
        [action.payload]: Object.assign({}, state[action.payload], {
          required: !state[action.payload].required,
        })
      }),

    [ACTION_TYPES.FORM_SETTING_TOGGLE]: (state, action) => {
      const newState = action.payload;
      return Object.assign({}, state, {
        settingsOpen: newState !== true ? newState : !state.settingsOpen
      });
    },

    [ACTION_TYPES.FORM_CLEAR]: () => initialState
  },
  initialState
);

export default FormReducer;

// Selector Input
const getFormState = state => state.form;

// Selectors
export const getRows = createSelector(
  getFormState,
  formState => formState.rows
);

export const getRecipient = createSelector(
  getFormState,
  formState => formState.recipient
);
