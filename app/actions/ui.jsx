// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Contacts
export const changeActiveTab = tabName => {
  return {
    type: ACTION_TYPES.UI_CHANGE_TAB,
    payload: tabName,
  };
};
