import * as ACTION_TYPES from '../constants/actions.jsx';

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
