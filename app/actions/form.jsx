import * as ACTION_TYPES from '../constants/actions.jsx';
import {createAction} from 'redux-actions';

// Recipient
export const updateRecipient = createAction(
  ACTION_TYPES.FORM_RECIPIENT_UPDATE,
  data => data
);

// ItemsRow
export const addItem = createAction(ACTION_TYPES.FORM_ITEM_ADD);

export const removeItem = createAction(
  ACTION_TYPES.FORM_ITEM_REMOVE,
  itemID => itemID
);

export const updateItem = createAction(
  ACTION_TYPES.FORM_ITEM_UPDATE,
  itemData => itemData
);

export const moveRow = createAction(
  ACTION_TYPES.FORM_ITEM_MOVE,
  (dragIndex, hoverIndex) => ({ dragIndex, hoverIndex })
);

// Form Actions
export const clearForm = createAction(
  ACTION_TYPES.FORM_CLEAR,
  (muted=false) => muted
);

export const saveFormData = createAction(ACTION_TYPES.FORM_SAVE);

export const toggleFormSettings = createAction(
  ACTION_TYPES.FORM_SETTING_TOGGLE,
);

export const closeFormSettings = createAction(
  ACTION_TYPES.FORM_SETTING_CLOSE,
);

export const updateFieldData = createAction(
  ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
  (field, data) => ({field, data})
);

export const toggleField = createAction(
  ACTION_TYPES.FORM_FIELD_TOGGLE,
  field => field
);
