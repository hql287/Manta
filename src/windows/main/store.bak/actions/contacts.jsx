import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Get All Contacts
export const getAllContacts = createAction(ACTION_TYPES.CONTACT_GET_ALL);

// Save A Contact
export const saveContact = createAction(
  ACTION_TYPES.CONTACT_SAVE,
  invoiceData => invoiceData
);

// Delete A Contact
export const deleteContact = createAction(
  ACTION_TYPES.CONTACT_DELETE,
  contactID => contactID
);
