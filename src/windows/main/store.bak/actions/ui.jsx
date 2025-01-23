import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Change Active Tab
export const changeActiveTab = createAction(
  ACTION_TYPES.UI_TAB_CHANGE,
  tabName => tabName
);

// Update Check For Update Message
export const checkUpdatesMessage = createAction(
  ACTION_TYPES.UI_CHECK_UPDATES_MESSAGE,
  (content, type) => ({
    content,
    type,
  })
);

// Create new Notification
export const newNoti = createAction(
  ACTION_TYPES.UI_NOTIFICATION_NEW,
  (messageType, messageContent) => ({
    type: messageType,
    message: messageContent,
  })
);

// Remove Notification
export const removeNoti = createAction(
  ACTION_TYPES.UI_NOTIFICATION_REMOVE,
  notificationID => notificationID
);
