import { combineReducers } from 'redux';
import SettingsReducer from './SettingsReducer';
import ItemsReducer from './ItemsReducer';

export default combineReducers({
  ItemsReducer,
  SettingsReducer
});
