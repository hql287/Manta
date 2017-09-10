import uuidv4 from 'uuid/v4';
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  activeTab: 'form',
  notifications: [],
};

const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    // Change Active Tab
    case ACTION_TYPES.UI_CHANGE_TAB: {
      return Object.assign({}, state, {
        activeTab: action.payload,
      });
    }

    // Show Notification
    case ACTION_TYPES.UI_NEW_NOTIFICATION: {
      const newNotification = {
        id: uuidv4(),
        type: action.payload.type,
        message: action.payload.message,
      };
      return Object.assign({}, state, {
        notifications: [ newNotification ]
      });
    }

    // Remove Notification
    case ACTION_TYPES.UI_REMOVE_NOTIFICATION: {
      return Object.assign({}, state, {
        notifications: []
      });
    }

    // Default Case
    default: {
      return state;
    }
  }
};

export default UIReducer;
