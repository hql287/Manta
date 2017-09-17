import * as ACTION_TYPES from '../constants/actions.jsx';

// Recipient
export const updateRecipient = data => {
  return {
    type: ACTION_TYPES.FORM_RECIPIENT_UPDATE,
    payload: data,
  };
};

// ItemsRow
export const addItem = () => {
  return {
    type: ACTION_TYPES.FORM_ITEM_ADD,
  };
};

export const removeItem = itemID => {
  return {
    type: ACTION_TYPES.FORM_ITEM_REMOVE,
    payload: itemID,
  };
};

export const updateItem = itemData => {
  return {
    type: ACTION_TYPES.FORM_ITEM_UPDATE,
    payload: itemData,
  };
};

export const moveRow = (dragIndex, hoverIndex) => {
  return {
    type: ACTION_TYPES.FORM_ITEM_MOVE,
    payload: {
      dragIndex,
      hoverIndex,
    }
  };
};

// Form Actions

export const clearForm = (muted=false) => {
  return {
    type: ACTION_TYPES.FORM_CLEAR,
    payload: muted,
  };
};

export const saveFormData = (withPreview=false) => {
  return {
    type: ACTION_TYPES.FORM_SAVE,
    payload: withPreview
  };
};

export const toggleFormSettings = (newState=true) => {
  return {
    type: ACTION_TYPES.FORM_SETTING_TOGGLE,
    payload: newState,
  };
};

export const updateFieldData = (field, data) => {
  return {
    type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
    payload: {
      field,
      data,
    }
  };
};

export const toggleField = field => {
  return {
    type: ACTION_TYPES.FORM_FIELD_TOGGLE,
    payload: field,
  };
};

