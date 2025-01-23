import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as Actions from '../../actions/contacts';
import ContactsMW from '../ContactsMW';
import faker from 'faker';
import i18n from '../../../i18n/i18n';

// Mocks
import {
  saveDoc,
  deleteDoc,
  getAllDocs,
  mockData, // eslint-disable-line import/named
} from '../../helpers/pouchDB';
jest.mock('../../helpers/pouchDB');
Date.now = jest.fn(() => 'now');

describe('Contacts Middleware', () => {
  let next, dispatch, middleware;
  beforeEach(() => {
    next = jest.fn();
    dispatch = jest.fn();
    middleware = ContactsMW({ dispatch })(next);
  });

  describe('should handle CONTACT_GET_ALL action', () => {
    it('retrieves data correct DB', () => {
      // Execute
      middleware(Actions.getAllContacts());
      // Expect
      // Call correct function
      expect(getAllDocs).toHaveBeenCalled();
      expect(getAllDocs).toHaveBeenCalledWith('contacts');
      expect(getAllDocs).not.toHaveBeenCalledWith('invoices');
      expect(getAllDocs).not.toHaveBeenCalledWith('');
      // Correctly resolves
      expect(getAllDocs('contacts')).resolves.toBe(mockData.contactsRecords);
    });

    it('calls next after the promised is returned', () => {
      const action = Actions.getAllContacts();
      middleware(action).then(() => {
        // Never call dispatch
        expect(dispatch.mock.calls.length).toBe(0);
        // Calling next with resolved data
        return getAllDocs('contacts').then(data => {
          expect(next.mock.calls.length).toBe(1);
          expect(next).toHaveBeenCalledWith(
            Object.assign({}, action, {
              payload: data,
            })
          );
        });
      });
    });

    it('handle error correctly', () => {
      // Make sure getAllDocs will be called with incorrect dbName
      getAllDocs.mockImplementationOnce(() => getAllDocs('random-string'));
      const expectedError = new Error('Incorrect database!');
      // Execute
      middleware(Actions.getAllContacts()).then(() => {
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          type: ACTION_TYPES.UI_NOTIFICATION_NEW,
          payload: {
            type: 'warning',
            message: expectedError.message,
          },
        });
      });
    });

    it('handle unknown error correctly', () => {
      const unknownError = new Error('Something broke');
      getAllDocs.mockImplementationOnce(() => Promise.reject(unknownError));
      middleware(Actions.getAllContacts()).then(() =>
        getAllDocs().catch(err => {
          expect(next).toHaveBeenCalled();
          expect(next).toHaveBeenCalledWith({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: unknownError.message,
            },
          });
        })
      );
    });
  });

  describe('should handle CONTACT_SAVE action', () => {
    it('addes id and timestamp to contact data', () => {
      // Setup
      const newContact = {
        fullname: faker.name.findName(),
        email: faker.internet.email(),
      };
      // Execute
      middleware(Actions.saveContact(newContact));
      // Expect
      expect(saveDoc).toHaveBeenCalled();
      expect(saveDoc).toHaveBeenCalledWith('contacts', newContact);
    });

    it('should save records to DB', () => {
      // Setup
      const newContact = {
        fullname: faker.name.findName(),
        email: faker.internet.email(),
      };
      // Execute
      middleware(Actions.saveContact(newContact)).then(() =>
        saveDoc('contacts', newContact).then(data => {
          // Expect
          expect(data).toEqual([...mockData.contactsRecords, newContact]);
        })
      );
    });

    it('should call next and dispatch notification ', () => {
      // Setup
      const newContact = {
        _id: 'id-string',
        created_at: 'now',
        fullname: faker.name.findName(),
        email: faker.internet.email(),
      };
      const action = Actions.saveContact(newContact);

      // Execute
      middleware(action).then(() =>
        saveDoc('contacts', newContact).then(data => {
          // Expect calling next
          expect(next.mock.calls.length).toBe(1);
          expect(next).toHaveBeenCalledWith(
            Object.assign({}, action, {
              payload: [
                ...mockData.contactsRecords,
                newContact
              ],
            })
          );
          // Dispatch success notification
          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch).toHaveBeenCalledWith({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: i18n.t('messages:contact:saved')
            },
          });
        })
      );
    });

    it('handle syntax error correctly', () => {
      const newContact = {
        fullname: faker.name.findName(),
        email: faker.internet.email(),
      };
      middleware(Actions.saveContact(newContact)).then(() => {
        const dbError = new Error('No database found!');
        const docError = new Error('No doc found!');
        expect(saveDoc()).rejects.toEqual(dbError);
        expect(saveDoc('invoices')).rejects.toEqual(docError);
      });
    });

    it('handle unknown error correctly', () => {
      // Setup
      const newContact = {
        fullname: faker.name.findName(),
        email: faker.internet.email(),
      };
      const expectedError = new Error('Something Broken!');
      saveDoc.mockImplementationOnce(() => Promise.reject(expectedError));
      // Execute
      middleware(Actions.saveContact(newContact)).then(() => {
        // Expect
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          type: ACTION_TYPES.UI_NOTIFICATION_NEW,
          payload: {
            type: 'warning',
            message: expectedError.message,
          },
        });
      });
    });
  });

  describe('should handle CONTACT_DELETE action', () => {
    it('should remove record from DB correctly', () => {
      // Setup
      const contactID = 'jon-snow';
      const action = Actions.deleteContact(contactID);
      // Execute
      middleware(action).then(() =>
        deleteDoc('contacts', contactID).then(data => {
          expect(data).toEqual([]);
        })
      );
    });

    it('should call next and dispatch notification ', () => {
      // Setup
      const contactID = 'jon-snow';
      const action = Actions.deleteContact(contactID);
      // Execute
      middleware(action).then(() =>
        deleteDoc('contacts', contactID).then(data => {
          // Call next after the promised is returned
          expect(next.mock.calls.length).toBe(1);
          expect(next).toHaveBeenCalledWith(
            Object.assign({}, action, {
              payload: [],
            })
          );
          // Dispatch success notification
          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch).toHaveBeenCalledWith({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: i18n.t('messages:contact:deleted')
            },
          });
        })
      );
    });

    it('handle error correctly', () => {
      // Set up
      const contactID = 'ned-stark';
      const expectedError = new Error('No contact found!');

      // Execute
      middleware(Actions.deleteContact(contactID)).then(() => {
        // Expect
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          type: ACTION_TYPES.UI_NOTIFICATION_NEW,
          payload: {
            type: 'warning',
            message: expectedError.message,
          },
        });
      });
    });
  });

  it('let other actions pass through', () => {
    const action = { type: 'TEST' };
    middleware(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
