import * as ACTION_TYPES from '../constants/actions.jsx';
import { handleActions } from 'redux-actions';

const initialState = {
  activeTab: 'form',
  notifications: [],
  checkUpdatesMessage: {},
};

const UIReducer = handleActions(
  {
    [ACTION_TYPES.UI_CHECK_UPDATES_MESSAGE]: (state, action) =>
      Object.assign({}, state, {
        checkUpdatesMessage: action.payload,
      }),

    [ACTION_TYPES.UI_TAB_CHANGE]: (state, action) =>
      Object.assign({}, state, {
        activeTab: action.payload,
      }),

    [ACTION_TYPES.UI_NOTIFICATION_NEW]: (state, action) =>
      Object.assign({}, state, {
        notifications: [action.payload, ...state.notifications],
      }),

    [ACTION_TYPES.UI_NOTIFICATION_REMOVE]: (state, action) =>
      Object.assign({}, state, {
        notifications: state.notifications.filter(
          item => item.id !== action.payload
        ),
      }),
  },
  initialState
);

export default UIReducer;
