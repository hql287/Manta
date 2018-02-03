import * as Actions from '../../actions/form';
import FormMW from '../FormMW';

jest.mock('../../helpers/form');

describe('Form Middleware', () => {
  let next, dispatch, getState;

  beforeEach(() => {
    next = jest.fn();
    dispatch = jest.fn();
  });

  describe('should handle FORM_SAVE action', () => {
    it('should save Invocie, save Contact and Clear the Form', () => {
      // Setup
      getState = jest.fn(() => ({
        form: {
          validation: true,
          recipient: {
            newRecipient: true
          },
          settings: {
            editMode: {
              active: false,
            }
          }
        },
      }));
      const middleware = FormMW({ dispatch, getState })(next);
      // Action
      middleware(Actions.saveFormData());
      // Expect
      expect(getState.mock.calls.length).toBe(1);
      // Save the Invoice, Save new contact & Clear the Form
      expect(dispatch.mock.calls.length).toBe(3);
      // No Calling Next
      expect(next.mock.calls.length).toBe(0);
    });

    it('should save Invocie, NOT save Contact and Clear the Form', () => {
      // Setup
      getState = jest.fn(() => ({
        form: {
          validation: true,
          recipient: { newRecipient: false },
          settings: {
            editMode: {
              active: false,
            }
          }
        },
      }));
      const middleware = FormMW({ dispatch, getState })(next);

      // Action
      const action = Actions.saveFormData();
      middleware(action);

      // Expect
      expect(getState.mock.calls.length).toBe(1);
      // Save the Invoice & Clear the Form
      expect(dispatch.mock.calls.length).toBe(2);
      // No Calling Next
      expect(next.mock.calls.length).toBe(0);
    });

    it('should update Invocie, save Contact, Clear the Form and Switch Tab', () => {
      // Setup
      getState = jest.fn(() => ({
        form: {
          validation: true,
          recipient: { newRecipient: true },
          settings: {
            editMode: {
              active: true,
              data: { _id: 'invoice-uuid' }
            }
          }
        },
      }));
      const middleware = FormMW({ dispatch, getState })(next);
      const action = Actions.saveFormData();
      // Action
      middleware(action);
      // Expect
      expect(getState.mock.calls.length).toBe(1);
      // Update the Invoice, Save new contact, Clear the Form & Change Tab
      expect(dispatch.mock.calls.length).toBe(4);
      // No Calling Next
      expect(next.mock.calls.length).toBe(0);
    });

    it('should update Invocie, NOT add new Contact, Clear the Form and Switch Tab', () => {
      // Setup
      getState = jest.fn(() => ({
        form: {
          validation: true,
          recipient: { newRecipient: false },
          settings: {
            editMode: {
              active: true,
              data: { _id: 'invoice-uuid' }
            }
          }
        },
      }));
      const middleware = FormMW({ dispatch, getState })(next);

      // Action
      const action = Actions.saveFormData();
      middleware(action);

      // Expect
      expect(getState.mock.calls.length).toBe(1);
      // Update the Invoice, Clear the Form and Switch Tab
      expect(dispatch.mock.calls.length).toBe(3);
      // No Calling Next
      expect(next.mock.calls.length).toBe(0);
    });
  });

  it('should NOT pass validation', () => {
    // Setup
    getState = jest.fn(() => ({
      form: { validation: false },
    }));
    const middleware = FormMW({ dispatch, getState })(next);

    // Action
    const action = Actions.saveFormData();
    middleware(action);

    // Expect
    expect(getState.mock.calls.length).toBe(1);
    // No calling to Dispatch or Next since it failed validation
    expect(dispatch.mock.calls.length).toBe(0);
    expect(next.mock.calls.length).toBe(0);
  });

  it('should hanlde FORM_ITEM_ADD action', () => {
    // Setup
    getState = jest.fn();
    const middleware = FormMW({ dispatch, getState })(next);

    // Action
    const action = Actions.addItem();
    middleware(action);

    // Expect
    expect(getState.mock.calls.length).toBe(0);
    expect(next.mock.calls.length).toBe(1);
    expect(next).toHaveBeenCalledWith(
      Object.assign({}, action, {
        payload: Object.assign({}, action.payload, {
          id: 'id-string',
        }),
      })
    );
  });

  it('should hanlde FORM_CLEAR action', () => {
    // Setup
    getState = jest.fn();
    const middleware = FormMW({ dispatch, getState })(next);

    // Action
    const action = Actions.clearForm();
    middleware(action);

    // Expect
    expect(getState.mock.calls.length).toBe(0);
    // Close Form Settings & Add Item
    expect(dispatch.mock.calls.length).toBe(2);
    expect(next.mock.calls.length).toBe(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('let other actions pass through', () => {
    getState = jest.fn();
    const middleware = FormMW({ dispatch, getState })(next);
    const action = { type: 'TEST' };
    middleware(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
