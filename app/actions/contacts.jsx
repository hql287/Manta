// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Contacts
export const getAllContacts = () => {
  return {
    type: ACTION_TYPES.GET_ALL_CONTACTS,
  };
};

// Get One Contact
export const getOneContact = _id => {
  return {
    type: ACTION_TYPES.GET_ONE_CONTACT,
    _id,
  };
};

// Save A Contact
export const saveContact = data => {
  return {
    type: ACTION_TYPES.SAVE_CONTACT,
    data,
  };
};

// Delete A Contact
export const deleteContact = _id => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT,
    _id,
  };
};
