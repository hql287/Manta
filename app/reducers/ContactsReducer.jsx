// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  loaded: false,
  data: [],
};

const ContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get All Recipients
    case ACTION_TYPES.GET_ALL_CONTACTS: {
      return Object.assign({}, state, {
        loaded: true,
        data: action.data,
      });
    }
    // Get One Recipient
    case ACTION_TYPES.GET_ONE_CONTACT: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    // Save Recipient
    case ACTION_TYPES.SAVE_CONTACT: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    // Delete A Contact
    case ACTION_TYPES.DELETE_CONTACT: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    default: {
      return state;
    }
  }
};

export default ContactsReducer;
