import {createAction} from 'redux-actions';
import * as ACTION_TYPES from '../constants/actions.jsx';

export const changeTemplate = createAction(
  ACTION_TYPES.SETTINGS_UPDATE_TEMPLATE,
  template => template
);

export const updateConfigs = createAction(
  ACTION_TYPES.SETTINGS_UPDATE_CONFIGS,
  configs => configs
);

