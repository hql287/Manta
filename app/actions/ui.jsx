// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Contacts
export const changeActiveTab = tabName => {
  return {
    type: ACTION_TYPES.UI_CHANGE_TAB,
    payload: tabName,
  };
};

export const newNoti = (messageType, messageContent) => {
  return {
    type: ACTION_TYPES.UI_NEW_NOTIFICATION,
    payload: {
      type: messageType,
      message: messageContent,
    },
  };
};

export const removeNoti = () => {
  return {
    type: ACTION_TYPES.UI_REMOVE_NOTIFICATION,
  };
};
