import * as ACTION_TYPES from '../constants/actions.jsx';

export const updateRecipient = data => {
  return {
    type: ACTION_TYPES.UPDATE_RECIPIENT,
    data
  };
};

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

export const clearForm = () => {
  return {
    type: ACTION_TYPES.CLEAR_FORM,
  };
};

export const updateDiscountAmount = data => {
  return {
    type: ACTION_TYPES.UPDATE_DISCOUNT_AMOUNT,
    data
  };
};

export const updateDiscountType = data => {
  return {
    type: ACTION_TYPES.UPDATE_DISCOUNT_TYPE,
    data
  };
};

export const updateNote = data => {
  return {
    type: ACTION_TYPES.UPDATE_NOTE,
    data
  };
};

export const updateCurrency = data => {
  return {
    type: ACTION_TYPES.UPDATE_CURRENCY,
    data
  };
};


