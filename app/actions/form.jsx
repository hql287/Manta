import * as ACTION_TYPES from '../constants/actions.jsx';

// Recipient
export const updateRecipient = data => {
  return {
    type: ACTION_TYPES.FORM_RECIPIENT_UPDATE,
    data
  };
};

// ItemsRow
export const addItem = () => {
  return {
    type: ACTION_TYPES.FORM_ITEM_ADD,
  };
};

export const removeItem = id => {
  return {
    type: ACTION_TYPES.FORM_ITEM_REMOVE,
    id
  };
};

export const updateItem = data => {
  return {
    type: ACTION_TYPES.FORM_ITEM_UPDATE,
    data
  };
};

export const moveRow = (dragIndex, hoverIndex) => {
  return {
    type: ACTION_TYPES.FORM_ITEM_MOVE,
    dragIndex,
    hoverIndex,
  };
};

// Form Actions

export const clearForm = vol => {
  return {
    type: ACTION_TYPES.FORM_CLEAR,
    payload: { vol }
  };
};

export const saveFormData = () => {
  return {
    type: ACTION_TYPES.FORM_SAVE
  };
};

export const toggleFormSettings = (newState) => {
  return {
    type: ACTION_TYPES.FORM_SETTING_TOGGLE,
    payload: { state: newState },
  };
};

export const updateFieldData = (field, data) => {
  return {
    type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
    field,
    data,
  };
};

export const toggleField = field => {
  return {
    type: ACTION_TYPES.FORM_FIELD_TOGGLE,
    field,
  };
};

