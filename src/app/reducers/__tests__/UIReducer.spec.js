import UIReducer from '../UIReducer';
import * as ACTION_TYPES from '../../constants/actions.jsx';

const initialState = {
  activeTab: 'form',
  notifications: [],
  checkUpdatesMessage: {},
};

describe('UI Reducer', () => {
  it('should handle initial state', () => {
    expect(UIReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UI_TAB_CHANGE action', () => {
    const newState = UIReducer(initialState, {
      type: ACTION_TYPES.UI_TAB_CHANGE,
      payload: 'invoices',
    });
    expect(newState.activeTab).toEqual('invoices');
    const newState2 = UIReducer(initialState, {
      type: ACTION_TYPES.UI_TAB_CHANGE,
      payload: 'contacts',
    });
    expect(newState2.activeTab).toEqual('contacts');
    const newState3 = UIReducer(initialState, {
      type: ACTION_TYPES.UI_TAB_CHANGE,
      payload: 'settings',
    });
    expect(newState3.activeTab).toEqual('settings');
  });

  it('should handle UI_NOTIFICATION_NEW action', () => {
    const newState = UIReducer(initialState, {
      type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      payload: {
        type: 'warning',
        message: 'Missing Document',
      },
    });
    expect(newState.notifications).toHaveLength(1);
    expect(newState.notifications[0].type).toEqual('warning');
    expect(newState.notifications[0].message).toEqual('Missing Document');
  });

  it('should handle UI_NOTIFICATION_REMOVE action', () => {
    const currentState = {
      activeTab: 'form',
      notifications: [
        {
          id: 'abc',
          type: 'warning',
          message: 'Missing Doc',
        },
        {
          id: 'xyz',
          type: 'success',
          message: 'Invoice Created Successfully',
        },
      ],
    };
    const newState = UIReducer(currentState, {
      type: ACTION_TYPES.UI_NOTIFICATION_REMOVE,
      payload: 'abc',
    });
    expect(newState.notifications).toHaveLength(1);
    expect(newState.notifications[0].id).toEqual('xyz');
    const newState2 = UIReducer(currentState, {
      type: ACTION_TYPES.UI_NOTIFICATION_REMOVE,
      payload: 'xyz',
    });
    expect(newState2.notifications).toHaveLength(1);
    expect(newState2.notifications[0].id).toEqual('abc');
  });
});
