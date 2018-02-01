import * as ACTION_TYPES from '../../constants/actions';
import * as actions from '../settings';

it('getInitalSettings should create GET_INITIAL_SETTINGS action', () => {
  expect(actions.getInitalSettings()).toEqual({
    type: ACTION_TYPES.SETTINGS_GET_INITIAL,
  });
});

it('updateSettings should create SAVE_SETTINGS action', () => {
  const settingsData = {
    fullname: 'Jon Snow',
    company: 'HBO',
    address: 'Winterfell',
  };
  const settingType = 'info';
  expect(actions.updateSettings(settingType, settingsData)).toEqual({
    type: ACTION_TYPES.SETTINGS_UPDATE,
    payload: {
      setting: settingType,
      data: settingsData,
    },
  });
});

it('saveSettings should create SAVE_SETTINGS action', () => {
  const settingsData = {};
  expect(actions.saveSettings(settingsData)).toEqual({
    type: ACTION_TYPES.SETTINGS_SAVE,
    payload: settingsData,
  });
});

it('notifyInvalidDecimalFractions should create UI_NOTIFICATION_NEW action', () => {
  const settingsData = {};
  expect(actions.notifyInvalidDecimalFractions(settingsData)).toEqual({
    type: ACTION_TYPES.UI_NOTIFICATION_NEW,
    payload: {message: 'Invalid decimal fractions specified! Please correct settings.', type: 'warning'},
  });
});
