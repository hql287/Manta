import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import FormReducer from './FormReducer';
import InvoicesReducer from './InvoicesReducer';
import ContactsReducer from './ContactsReducer';

export default combineReducers({
  FormReducer,
  InvoicesReducer,
  ContactsReducer,
  SettingsReducer,
});
