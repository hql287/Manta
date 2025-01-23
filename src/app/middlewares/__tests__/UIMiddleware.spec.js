import * as UIActions from '../../actions/ui';
import * as FormActions from '../../actions/form';
import UIMiddleware from '../UIMiddleware';

// Use the mock
jest.mock('../../../libs/sounds');
const sounds = require('../../../libs/sounds');

describe('UI Middleware', () => {
  let next, getState, middleware;
  beforeEach(() => {
    next = jest.fn();
    getState = jest.fn(() => ({
      ui: {
        activeTab: 'form',
        notifications: [],
      },
    }));
    middleware = UIMiddleware({ getState })(next);
  });

  describe('should handle UI_TAB_CHANGE action', () => {
    it('should NOT update active tab', () => {
      middleware(UIActions.changeActiveTab('form'));
      expect(getState.mock.calls.length).toBe(1);
      expect(next.mock.calls.length).toBe(0);
    });

    it('should update active tab', () => {
      const action = UIActions.changeActiveTab('settings');
      middleware(action);
      expect(getState.mock.calls.length).toBe(1);
      expect(next.mock.calls.length).toBe(1);
      expect(next).toHaveBeenCalledWith(action);
      // Test Sound
      expect(sounds.play).toBeCalledWith('TAP');
    });
  });

  describe('should handle update notifications', () => {
    it('should handle UI_NOTIFICATION_NEW action', () => {
      const action = UIActions.newNoti(
        'success',
        'Invoice has been created successfully!'
      );
      middleware(action);
      expect(getState.mock.calls.length).toBe(0);
      expect(next.mock.calls.length).toBe(1);
      // Add id field with uuidv4 string to payload
      expect(next).toHaveBeenCalledWith(
        Object.assign({}, action, {
          payload: Object.assign({}, action.payload, {
            id: 'id-string',
          }),
        })
      );
      // Test Sound
      expect(sounds.play).toBeCalledWith('SUCCESS');
    });

    it('should handle UI_NOTIFICATION_NEW action', () => {
      const action = UIActions.newNoti('warning', 'Missing Doc');
      middleware(action);
      expect(getState.mock.calls.length).toBe(0);
      expect(next.mock.calls.length).toBe(1);
      // Add id field with uuidv4 string to payload
      expect(next).toHaveBeenCalledWith(
        Object.assign({}, action, {
          payload: Object.assign({}, action.payload, {
            id: 'id-string',
          }),
        })
      );
      // Test Sound
      expect(sounds.play).toBeCalledWith('WARNING');
    });
  });

  describe('should handle form actions', () => {
    it('should handle FORM_ITEM_ADD action', () => {
      const action = FormActions.addItem();
      middleware(action);
      expect(getState.mock.calls.length).toBe(0);
      expect(next.mock.calls.length).toBe(1);
      expect(next).toHaveBeenCalledWith(action);
      expect(sounds.play).toBeCalledWith('ADD');
    });

    it('should handle FORM_ITEM_REMOVE action', () => {
      const action = FormActions.removeItem();
      middleware(action);
      expect(getState.mock.calls.length).toBe(0);
      expect(next.mock.calls.length).toBe(1);
      expect(next).toHaveBeenCalledWith(action);
      expect(sounds.play).toBeCalledWith('REMOVE');
    });

    it('should handle FORM_CLEAR action WIHOUT sound', () => {
      const action = FormActions.clearForm('muted');
      middleware(action);
      expect(getState.mock.calls.length).toBe(0);
      expect(next.mock.calls.length).toBe(1);
      expect(next).toHaveBeenCalledWith(action);
    });

    it('should handle FORM_CLEAR action WITH sound', () => {
      const action = FormActions.clearForm();
      middleware(action);
      expect(sounds.play).toBeCalledWith('RELOAD');
    });
  });

  it('let other actions pass through', () => {
    const action = { type: 'TEST' };
    middleware(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
