// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Contacts
export const getAllContacts = () => {
  return {
    type: ACTION_TYPES.CONTACT_GET_ALL,
  };
};

// Save A Contact
export const saveContact = invoiceData => {
  return {
    type: ACTION_TYPES.CONTACT_SAVE,
    payload: invoiceData,
  };
};

// Delete A Contact
export const deleteContact = contactID => {
  return {
    type: ACTION_TYPES.CONTACT_DELETE,
    payload: contactID,
  };
};
