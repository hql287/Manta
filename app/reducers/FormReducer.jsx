// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
// Libs
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
// Retrive settings
const appConfig = require('electron').remote.require('electron-settings');
const invoiceSettings = appConfig.get('invoice');
// Helper
import { setEditRecipient } from '../helpers/form';

const initialState = {
  recipient: {
    newRecipient: true,
    select: {},
    new: {},
  },
  rows: [],
  dueDate: {
    selectedDate: null,
    paymentTerm: null,
    useCustom: true,
  },
  discount: {},
  note: {},
  invoiceID: "",
  // Set default values for currency and tax
  currency: invoiceSettings.currency,
  tax: invoiceSettings.tax,
  // Form current settings
  settings: {
    open: false,
    editMode: {
      active: false,
    },
    required_fields: invoiceSettings.required_fields,
  },
  // Saved settings, reserve for reference
  savedSettings: {
    tax: invoiceSettings.tax,
    currency: invoiceSettings.currency,
    required_fields: invoiceSettings.required_fields,
  },
};

const FormReducer = handleActions(
  {
    [ACTION_TYPES.FORM_RECIPIENT_UPDATE]: (state, action) =>
      Object.assign({}, state, {
        recipient: action.payload,
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
        rows: state.rows.map(
          item => (item.id !== action.payload.id ? item : action.payload)
        ),
      }),

    [ACTION_TYPES.FORM_ITEM_MOVE]: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragRow = state.rows[dragIndex];
      const newRows = state.rows;
      newRows.splice(dragIndex, 1);
      newRows.splice(hoverIndex, 0, dragRow);
      return Object.assign({}, state, {
        rows: newRows,
      });
    },

    [ACTION_TYPES.FORM_FIELD_UPDATE_DATA]: (state, action) => {
      const { field, data } = action.payload;
      if (typeof data === 'object') {
        return Object.assign({}, state, {
          [field]: {
            ...state[field],
            ...data,
          },
        });
      }
      return Object.assign({}, state, {
        [field]: data
      });
    },

    [ACTION_TYPES.FORM_FIELD_TOGGLE]: (state, action) =>
      Object.assign({}, state, {
        settings: Object.assign({}, state.settings, {
          required_fields: Object.assign({}, state.settings.required_fields, {
            [action.payload]: !state.settings.required_fields[action.payload],
          }),
        }),
      }),

    [ACTION_TYPES.FORM_SETTING_TOGGLE]: state =>
      Object.assign({}, state, {
        settings: Object.assign({}, state.settings, {
          open: !state.settings.open,
        }),
      }),

    [ACTION_TYPES.FORM_SETTING_CLOSE]: state =>
      Object.assign({}, state, {
        settings: Object.assign({}, state.settings, {
          open: false,
        }),
      }),

    [ACTION_TYPES.INVOICE_EDIT]: (state, action) => {
      const {
        invoiceID,
        recipient,
        rows,
        currency,
        tax,
        dueDate,
        discount,
        note,
        contacts,
      } = action.payload;
      return Object.assign({}, state, {
        // Populate data
        recipient: Object.assign(
          {},
          state.recipient,
          setEditRecipient(contacts, recipient)
        ),
        rows,
        // Optional Data
        invoiceID: invoiceID !== undefined ? invoiceID : state.invoiceID,
        currency: currency !== undefined ? currency : state.currency,
        discount: discount !== undefined ? discount : state.discount,
        tax: tax !== undefined ? tax : state.tax,
        dueDate: dueDate !== undefined ? dueDate : state.dueDate,
        note:
          note !== undefined
            ? Object.assign({}, state.note, {
                content: note,
              })
            : state.note,
        // Update settings
        settings: Object.assign({}, state.settings, {
          editMode: {
            active: true,
            data: action.payload,
          },
          required_fields: Object.assign({}, state.settings.required_fields, {
            invoiceID: invoiceID !== undefined,
            currency: currency !== state.savedSettings.currency,
            tax: tax !== undefined,
            dueDate: dueDate !== undefined,
            discount: discount !== undefined,
            note: note !== undefined,
          }),
        }),
      });
    },

    [ACTION_TYPES.SAVED_FORM_SETTING_UPDATE]: (state, action) => {
      const invoiceSettings = action.payload;
      return Object.assign({}, state, {
        savedSettings: Object.assign({}, state.savedSettings, {
          tax: invoiceSettings.tax,
          currency: invoiceSettings.currency,
          required_fields: invoiceSettings.required_fields,
        }),
      });
    },

    [ACTION_TYPES.FORM_CLEAR]: state =>
      Object.assign({}, initialState, {
        // Reset to lastest saved settings
        currency: state.savedSettings.currency,
        // Reset to lastest saved settings
        tax: state.savedSettings.tax,
        // Update current settings
        settings: Object.assign({}, state.settings, {
          open: false,
          editMode: {
            active: false,
          },
          required_fields: state.savedSettings.required_fields,
        }),
        // Updated saved settings to the current saved settings
        savedSettings: state.savedSettings,
      }),
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
