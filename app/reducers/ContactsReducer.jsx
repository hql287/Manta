import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/contacts';

const ContactsReducer = handleActions(
  {
    [combineActions(
      Actions.getAllContacts,
      Actions.saveContact,
      Actions.deleteContact
    )]: (state, action) => action.payload,
  },
  []
);

export default ContactsReducer;

// Selector
const getContactsState = state => state.contacts;
export const getContacts = createSelector(
  getContactsState,
  contacts => contacts
);
