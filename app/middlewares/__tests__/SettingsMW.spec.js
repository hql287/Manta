// Libs
import * as Actions from '../../actions/settings';
import * as ACTION_TYPES from '../../constants/actions.jsx';
import SettingsMW from '../SettingsMW';
import i18n from '../../../i18n/i18n';
const sounds = require('../../../libs/sounds');
const ipc = require('electron').ipcRenderer;
const openDialog = require('../../renderers/dialog');
import { validateCurrency, validateTax } from '../../helpers/form.js';

// Mocking
jest.mock('../../../libs/sounds');
jest.mock('../../helpers/form');

describe('Settings Middleware', () => {
  let next, dispatch, middleware;
  beforeEach(() => {
    next = jest.fn();
    dispatch = jest.fn();
    middleware = SettingsMW({ dispatch })(next);
  });

  it('should handle SETTINGS_GET_INITIAL action', () => {
    const savedSettings = {
      profile: 'someSettings',
      invoice: 'someSettings',
      general: 'someSettings',
    };
    const action = Actions.getInitalSettings();
    middleware(action);
    expect(dispatch.mock.calls.length).toBe(0);
    expect(next.mock.calls.length).toBe(1);
    expect(next).toHaveBeenCalledWith(
      Object.assign({}, action, {
        payload: {
          current: savedSettings,
          saved: savedSettings,
        },
      })
    );
  });

  describe('should handle SETTINGS_SAVE action', () => {
    let action;
    beforeEach(() => {
      action = Actions.saveSettings({
        profile: 'New Profile',
        general: {
          language: 'fr',
        },
        invoice: {
          currency: {
            code: 'USD',
            fraction: 2,
            separator: 'commaDot',
            placement: 'before',
          },
          tax: {
            tin: '123-456-789',
            amount: 10,
            method: 'default',
          },
        },
      });
    });

    it('should validate currency and tax data', () => {
      middleware(action);
      expect(validateCurrency).toHaveBeenCalled();
      expect(validateCurrency).toHaveBeenCalledWith(true, action.payload.invoice.currency);
      expect(validateTax).toHaveBeenCalled();
      expect(validateTax).toHaveBeenCalledWith(true, action.payload.invoice.tax);
    });

    // TODO
    it('should save data', () => {});

    it('should reload sounds cache', () => {
      middleware(action);
      expect(sounds.preload).toHaveBeenCalled();
    });

    it('should notify previewWindow of language & profile change', () => {
      // Clear calls count
      ipc.send.mockClear();
      middleware(action);
      expect(ipc.send).toHaveBeenCalled();
      expect(ipc.send.mock.calls.length).toEqual(2);
      // Notify about profile change
      expect(ipc.send.mock.calls[0][0]).toBe('change-preview-window-profile');
      expect(ipc.send.mock.calls[0][1]).toBe('New Profile');
      // Notify about UI Lang change
      expect(ipc.send.mock.calls[1][0]).toBe('change-preview-window-language');
      expect(ipc.send.mock.calls[1][1]).toBe('fr');
    });

    it('should call next and dispatch notification', () => {
      middleware(action);
      // Call Next
      expect(next.mock.calls.length).toBe(1);
      expect(next).toHaveBeenCalledWith(action);
      // Send Notification
      expect(dispatch.mock.calls.length).toBe(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: ACTION_TYPES.UI_NOTIFICATION_NEW,
        payload: {
          type: 'success',
          message: i18n.t('messages:settings:saved'),
        },
      });
    });

  });

  it('let other actions pass through', () => {
    const action = { type: 'TEST' };
    middleware(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
