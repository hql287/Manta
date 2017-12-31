// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
// Libs
import {handleActions} from 'redux-actions';
import {createSelector} from 'reselect';
import currencies from '../../libs/currencies.json';
// Retrive settings
const appConfig = require('electron').remote.require('electron-settings');
const invoiceSettings = appConfig.get('invoice');

const initialState = {
  recipient: {
    newRecipient: true,
    select: {},
    new: {},
  },
  rows: [],
  dueDate: {},
  discount: {},
  note: {},
  // Set default values for currency and tax
  currency: currencies[invoiceSettings.currency],
  tax: invoiceSettings.tax,
  // Invoice settings
  settings: {
    open: false,
    currency: invoiceSettings.currency,
    tax: invoiceSettings.tax,
    required_fields: invoiceSettings.required_fields,
  }
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
      return Object.assign({}, state, {
        [field]: {
          ...state[field],
          ...data
        }
      });
    },

    [ACTION_TYPES.FORM_FIELD_TOGGLE]: (state, action) =>
      Object.assign({}, state, {
        settings: Object.assign({}, state.settings, {
          required_fields: Object.assign({}, state.settings.required_fields, {
            [action.payload]: !state.settings.required_fields[action.payload]
          })
        })
      }),

    [ACTION_TYPES.FORM_SETTING_TOGGLE]: state =>
      Object.assign({}, state, {
        settings: Object.assign({}, state.settings, {
          open: !state.settings.open
        })
      }),

    [ACTION_TYPES.FORM_SETTING_CLOSE]: state =>
      Object.assign({}, state, {
        settings: Object.assign({}, state.settings, {
          open: false
        })
      }),

    [ACTION_TYPES.FORM_SETTING_SAVE]: (state, action) => {
      const invoiceSettings = action.payload;
      return Object.assign({}, state, {
        settings: Object.assign({}, state.settings, {
          currency: invoiceSettings.currency,
          tax: invoiceSettings.tax,
          required_fields: invoiceSettings.required_fields,
        })
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
export const getCurrentInvoice = createSelector(
  getFormState,
  formState => formState
);

export const getRows = createSelector(
  getFormState,
  formState => formState.rows
);

export const getRecipient = createSelector(
  getFormState,
  formState => formState.recipient
);
