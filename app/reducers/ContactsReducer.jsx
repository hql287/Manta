// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  loaded: false,
  data: [],
};

const ContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get All Contacts
    case ACTION_TYPES.CONTACT_GET_ALL: {
      return Object.assign({}, state, {
        loaded: true,
        data: action.data,
      });
    }
    // Save Contact
    case ACTION_TYPES.CONTACT_SAVE: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    // Delete A Contact
    case ACTION_TYPES.CONTACT_DELETE: {
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
