import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as actions from '../index.jsx';

it('updateInvoice should create INVOICE_UPDATE action', () => {
  const invoiceData = { test: 'test'}
  expect(actions.updateInvoice(invoiceData)).toEqual({
    type: ACTION_TYPES.INVOICE_UPDATE,
    payload: invoiceData,
  });
});

it('updateConfigs should create SETTINGS_UPDATE_CONFIGS action', () => {
  const configs = { test: 'test'}
  expect(actions.updateConfigs(configs)).toEqual({
    type: ACTION_TYPES.SETTINGS_UPDATE_CONFIGS,
    payload: configs,
  });
});

it('updateProfile should create SETTINGS_UPDATE_PROFILE action', () => {
  const profile = { test: 'test'}
  expect(actions.updateProfile(profile)).toEqual({
    type: ACTION_TYPES.SETTINGS_UPDATE_PROFILE,
    payload: profile,
  });
});

it('changeUILanguage should create UI_CHANGE_LANGUAGE action', () => {
  const language = 'fr';
  expect(actions.changeUILanguage(language)).toEqual({
    type: ACTION_TYPES.UI_CHANGE_LANGUAGE,
    payload: language,
  });
});

it('reloadConfigs should create SETTINGS_RELOAD_CONFIGS action', () => {
  const newConfigs = { test: 'test'}
  expect(actions.reloadConfigs(newConfigs)).toEqual({
    type: ACTION_TYPES.SETTINGS_RELOAD_CONFIGS,
    payload: newConfigs,
  });
});
