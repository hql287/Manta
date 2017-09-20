import * as ACTION_TYPES from '../constants/actions.jsx';
import {createAction} from 'redux-actions';

// Change Active Tab
export const changeActiveTab = createAction(
  ACTION_TYPES.UI_TAB_CHANGE,
  tabName => tabName
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

// Show Alert
export const showAlert = createAction(
  ACTION_TYPES.UI_ALERT_SHOW,
  alertMessage => alertMessage
);

// Hide Alert
export const hideAlert = createAction(ACTION_TYPES.UI_ALERT_HIDE);
