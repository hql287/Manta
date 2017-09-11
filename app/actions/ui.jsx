// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Contacts
export const changeActiveTab = tabName => {
  return {
    type: ACTION_TYPES.UI_TAB_CHANGE,
    payload: tabName,
  };
};

export const newNoti = (messageType, messageContent) => {
  return {
    type: ACTION_TYPES.UI_NOTIFICATION_NEW,
    payload: {
      type: messageType,
      message: messageContent,
    },
  };
};

export const removeNoti = id => {
  return {
    type: ACTION_TYPES.UI_NOTIFICATION_REMOVE,
    payload: { id },
  };
};
