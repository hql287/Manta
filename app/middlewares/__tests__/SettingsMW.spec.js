import * as Actions from '../../actions/settings';
import SettingsMW from '../SettingsMW';
import * as ACTION_TYPES from '../../constants/actions.jsx';

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

  it('should handle SETTINGS_SAVE action', () => {
    // TODO
    // Validate data
    const action = Actions.saveSettings({
      profile: 'someSettings',
      invoice: {
        currency: {
          code: 'USD',
          fraction: 2,
          separator: 'commaDot',
          placement: 'before'
        },
        tax: {
          tin: '123-456-789',
          amount: 10,
          method: 'default'
        }
      },
      general: 'someSettings',
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
    const action = { type: 'TEST' };
    middleware(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
