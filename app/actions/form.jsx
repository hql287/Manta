import * as ACTION_TYPES from '../constants/actions.jsx';

// Recipient
export const updateRecipient = data => {
  return {
    type: ACTION_TYPES.UPDATE_RECIPIENT,
    data
  };
};

// ItemsRow
export const addItem = () => {
  return {
    type: ACTION_TYPES.ADD_ITEM,
  };
};

export const removeItem = id => {
  return {
    type: ACTION_TYPES.REMOVE_ITEM,
    id
  };
};

export const updateItem = data => {
  return {
    type: ACTION_TYPES.UPDATE_ITEM,
    data
  };
};

export const moveRow = (dragIndex, hoverIndex) => {
  return {
    type: ACTION_TYPES.MOVE_ROW,
    dragIndex,
    hoverIndex,
  };
};

// Discount
export const updateDiscount = data => {
  return {
    type: ACTION_TYPES.UPDATE_DISCOUNT,
    data
  };
}

// Note
export const updateNote = data => {
  return {
    type: ACTION_TYPES.UPDATE_NOTE,
    data
  };
};

// DueDate
export const changeDueDate = data => {
  return {
    type: ACTION_TYPES.CHANGE_DUE_DATE,
    data
  };
};

// Currency
export const updateCurrency = data => {
  return {
    type: ACTION_TYPES.UPDATE_CURRENCY,
    data
  };
};

// Form Actions
export const clearForm = () => {
  return {
    type: ACTION_TYPES.CLEAR_FORM,
  };
};

export const toggleField = field => {
  return {
    type: ACTION_TYPES.TOGGLE_FIELD,
    field,
  };
};

