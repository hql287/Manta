import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import FormReducer from './FormReducer';
import ReceiptsReducer from './ReceiptsReducer';

export default combineReducers({
  FormReducer,
  ReceiptsReducer,
  SettingsReducer
});
