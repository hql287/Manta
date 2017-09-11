import uuidv4 from 'uuid/v4';
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  activeTab: 'form',
  notifications: [],
};

const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    // Change Active Tab
    case ACTION_TYPES.UI_TAB_CHANGE: {
      return Object.assign({}, state, {
        activeTab: action.payload,
      });
    }

    // Show Notification
    case ACTION_TYPES.UI_NOTIFICATION_NEW: {
      const newNotification = {
        id: uuidv4(),
        type: action.payload.type,
        message: action.payload.message,
      };
      return Object.assign({}, state, {
        notifications: [
          newNotification,
          ...state.notifications
        ]
      });
    }

    // Remove Notification
    case ACTION_TYPES.UI_NOTIFICATION_REMOVE: {
      return Object.assign({}, state, {
        notifications: state.notifications.filter(item => item.id !== action.payload.id)
      });
    }

    // Default Case
    default: {
      return state;
    }
  }
};

export default UIReducer;
