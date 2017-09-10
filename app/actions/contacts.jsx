// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Contacts
export const getAllContacts = () => {
  return {
    type: ACTION_TYPES.CONTACT_GET_ALL,
  };
};

// Save A Contact
export const saveContact = data => {
  return {
    type: ACTION_TYPES.CONTACT_SAVE,
    data,
  };
};

// Delete A Contact
export const deleteContact = _id => {
  return {
    type: ACTION_TYPES.CONTACT_DELETE,
    _id,
  };
};
