import * as ACTION_TYPES from '../constants/actions.jsx';
import {handleActions} from 'redux-actions';

const SettingsReducer = handleActions(
  {
    [ACTION_TYPES.SETTINGS_GET_INITIAL]: (state, action) =>
      Object.assign({}, action.payload, {
        loaded: true,
      }),
    [ACTION_TYPES.SETTINGS_UPDATE]: (state, action) =>
      Object.assign({}, state, {
        current: Object.assign({}, state.current, {
          [action.payload.setting]: action.payload.data,
        }),
      }),
    [ACTION_TYPES.SETTINGS_SAVE]: (state, action) =>
      Object.assign({}, state, {
        saved: action.payload,
      }),
  },
  { loaded: false }
);

export default SettingsReducer;
