import * as ACTION_TYPES from '../constants/actions.jsx';
import {handleActions} from 'redux-actions';

const initialState = {
  alert: {
    show: false,
    message: null,
  },
  activeTab: 'form',
  notifications: [],
};

const UIReducer = handleActions(
  {
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
        )
      }),

    [ACTION_TYPES.UI_ALERT_SHOW]: (state, action) =>
      Object.assign({}, state, {
        alert: {
          show: true,
          message: action.payload,
        },
      }),

    [ACTION_TYPES.UI_ALERT_HIDE]: state =>
      Object.assign({}, state, {
        alert: {
          show: false,
          message: null,
        },
      }),
  },
  initialState
);

export default UIReducer;
