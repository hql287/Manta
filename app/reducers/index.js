import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import FormReducer from './FormReducer';
import ReceiptsReducer from './ReceiptsReducer';
import ContactsReducer from './ContactsReducer';

export default combineReducers({
  FormReducer,
  ReceiptsReducer,
  ContactsReducer,
  SettingsReducer,
});
