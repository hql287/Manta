import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import FormReducer from './FormReducer';
import InvoicesReducer from './InvoicesReducer';
import ContactsReducer from './ContactsReducer';
import UIReducer from './UIReducer';

export default combineReducers({
  FormReducer,
  InvoicesReducer,
  ContactsReducer,
  SettingsReducer,
  UIReducer,
});
