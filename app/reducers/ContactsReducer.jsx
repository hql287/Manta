import * as ACTION_TYPES from '../constants/actions.jsx';
import {handleActions} from 'redux-actions';

const initialState = {
  loaded: false,
  data: [],
};

const ContactsReducer = handleActions(
  {
    [ACTION_TYPES.CONTACT_GET_ALL]: (state, action) =>
      Object.assign({}, state, {
        loaded: true,
        data: action.payload,
      }),
    [ACTION_TYPES.CONTACT_SAVE]: (state, action) =>
      Object.assign({}, state, {
        data: action.payload,
      }),
    [ACTION_TYPES.CONTACT_DELETE]: (state, action) =>
      Object.assign({}, state, {
        data: action.payload,
      }),
  },
  initialState
);

export default ContactsReducer;
