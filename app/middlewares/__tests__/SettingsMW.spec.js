import * as Actions from '../../actions/settings';
import SettingsMW from '../SettingsMW';

jest.mock('../../../libs/sounds');

describe('Settings Middleware', () => {

  let next, dispatch, middleware;

  beforeEach(() => {
    next = jest.fn();
    dispatch = jest.fn();
    middleware = SettingsMW({dispatch})(next);
  });

  it('should handle SETTINGS_GET_INITIAL action', () => {
    const savedSettings = {
      info: 'someSettings',
      appSettings: 'someSettings',
      printOptions: 'someSettings',
    }
    const action = Actions.getInitalSettings();
    middleware(action);
    expect(dispatch.mock.calls.length).toBe(0);
    expect(next.mock.calls.length).toBe(1);
    expect(next).toHaveBeenCalledWith(Object.assign({}, action, {
      payload: {
        current: savedSettings,
        saved: savedSettings,
      }
    }));
  });

  it('should handle SETTINGS_SAVE action', () => {
    const action = Actions.saveSettings({
      payload: {
        info: 'someSettings',
        appSettings: 'someSettings',
        printOptions: 'someSettings',
      }
    });
    middleware(action);
    // Send Notification
    expect(dispatch.mock.calls.length).toBe(1);
    expect(next.mock.calls.length).toBe(1);
    expect(next).toHaveBeenCalledWith(action);
    // TODO
    // check if a sound is played
  });

  it('let other actions pass through', () => {
    const action = {type: 'TEST'};
    middleware(action);
    expect(next).toHaveBeenCalledWith(action);
  });
})
