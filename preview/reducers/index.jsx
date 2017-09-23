import { combineReducers } from 'redux';
import InvoiceReducer from './InvoiceReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  invoice: InvoiceReducer,
  settings: SettingsReducer,
});
