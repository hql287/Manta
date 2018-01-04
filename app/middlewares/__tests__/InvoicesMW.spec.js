import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as Actions from '../../actions/invoices';
import InvoicesMW from '../InvoicesMW';
import faker from 'faker';
import uuidv4 from 'uuid/v4';

// Mock Functions
const {
  getAllDocs,
  saveDoc,
  deleteDoc,
  mockData,
} = require('../../helpers/pouchDB');
import { getInvoiceValue } from '../../helpers/invoice';
import { ipcRenderer } from 'electron';
jest.mock('../../helpers/pouchDB');
jest.mock('../../helpers/invoice');
Date.now = jest.fn(() => 'now');

describe('Invoices Middleware', () => {
  let next, dispatch, middleware;

  beforeEach(() => {
    next = jest.fn();
    dispatch = jest.fn();
    middleware = InvoicesMW({ dispatch })(next);
  });

  describe('should handle INVOICE_GET_ALL action', () => {
    it('retrieves data from correct DB', () => {
      middleware(Actions.getInvoices());

      // Call correct function
      expect(getAllDocs).toHaveBeenCalled();
      expect(getAllDocs).toHaveBeenCalledWith('invoices');
      expect(getAllDocs).not.toHaveBeenCalledWith('contacts');
      expect(getAllDocs).not.toHaveBeenCalledWith('');
      // Correctly resolves
      expect(getAllDocs('invoices')).resolves.toBe(mockData.invoicesRecords);
    });

    it('calls next after the promised is returned', () => {
      const action = Actions.getInvoices();
      middleware(action).then(() => {
        // Never call dispatch
        expect(dispatch.mock.calls.length).toBe(0);
        // Call next with resolved data
        return getAllDocs('invoices').then(data => {
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
      middleware(Actions.getInvoices()).then(() => {
        // Calling next & send new notification
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
      middleware(Actions.getInvoices()).then(() =>
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

  describe('should handle INVOICE_SAVE action', () => {
    it('addes _id, created_at, subtotal & grandTotal to invoice data', () => {
      const newInvoice = {
        currency: {
          code: 'USD',
          symbol: '$',
        },
      };
      const action = Actions.saveInvoice(newInvoice);
      middleware(action);
      expect(saveDoc).toHaveBeenCalled();
      expect(saveDoc).toHaveBeenCalledWith(
        'invoices',
        Object.assign({}, newInvoice, {
          _id: uuidv4(),
          created_at: 'now',
          subtotal: 'subTotal',
          grandTotal: 'grandTotal',
          status: 'pending',
        })
      );
    });

    // TODO
    it('adds default currency data to invoice data');

    it('should save records to DB', () => {
      // Setup
      const newInvoice = {
        recipient: {
          fullname: faker.name.findName(),
          email: faker.internet.email(),
        },
        rows: [
          {
            id: uuidv4(),
            description: faker.commerce.productName(),
            price: faker.commerce.price(),
            quantity: faker.random.number(10),
          },
        ],
      };
      // Execute
      middleware(Actions.saveInvoice(newInvoice)).then(() =>
        saveDoc('invoices', newInvoice).then(data => {
          // Expect
          expect(data).toEqual([...mockData.invoicesRecords, newInvoice]);
        })
      );
    });

    it('should call next and dispatch notification ', () => {
      const newInvoice = {
        recipient: {
          fullname: faker.name.findName(),
          email: faker.internet.email(),
        },
        currency: {
          code: 'USD',
          symbol: '$',
        },
        rows: [
          {
            id: uuidv4(),
            description: faker.commerce.productName(),
            price: faker.commerce.price(),
            quantity: faker.random.number(10),
          },
        ],
      };

      // Execute
      const action = Actions.saveInvoice(newInvoice);
      middleware(action).then(() =>
        saveDoc('invoices', newInvoice).then(data => {
          // Call next after the promised is returned
          expect(next.mock.calls.length).toBe(1);
          expect(next).toHaveBeenCalledWith(
            Object.assign({}, action, {
              payload: [
                ...mockData.invoicesRecords,
                Object.assign({}, newInvoice, {
                  _id: uuidv4(),
                  created_at: 'now',
                  subtotal: 'subTotal',
                  grandTotal: 'grandTotal',
                  status: 'pending',
                }),
              ],
            })
          );
          // Dispatch success notification
          expect(dispatch.mock.calls.length).toBe(1);
          expect(dispatch).toHaveBeenCalledWith({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: 'Invoice Created Successfully',
            },
          });
        })
      );
    });

    it('tell main process to open preview window with invoice data', () => {
      const newInvoice = {
        recipient: {
          fullname: faker.name.findName(),
          email: faker.internet.email(),
        },
        currency: {
          code: 'USD',
          symbol: '$',
        },
        rows: [
          {
            id: uuidv4(),
            description: faker.commerce.productName(),
            price: faker.commerce.price(),
            quantity: faker.random.number(10),
          },
        ],
      };
      middleware(Actions.saveInvoice(newInvoice)).then(() =>
        saveDoc('invoices', newInvoice).then(data => {
          // ipc to main process
          expect(ipcRenderer.send).toHaveBeenCalled();
          expect(ipcRenderer.send).not.toHaveBeenCalledWith(
            'preview-invoice',
            newInvoice
          );
          expect(ipcRenderer.send).toHaveBeenCalledWith(
            'preview-invoice',
            Object.assign({}, newInvoice, {
              _id: uuidv4(),
              created_at: 'now',
              subtotal: 'subTotal',
              grandTotal: 'grandTotal',
              status: 'pending',
            })
          );
        })
      );
    });

    it('handle syntax error correctly', () => {
      const newInvoice = {
        recipient: {
          fullname: faker.name.findName(),
          email: faker.internet.email(),
        },
      };
      middleware(Actions.saveInvoice(newInvoice)).then(() => {
        const dbError = new Error('No database found!');
        const docError = new Error('No doc found!');
        expect(saveDoc()).rejects.toEqual(dbError);
        expect(saveDoc('invoices')).rejects.toEqual(docError);
      });
    });

    it('handle unknown error correctly', () => {
      // Setup
      const newInvoice = {
        recipient: {
          fullname: faker.name.findName(),
          email: faker.internet.email(),
        },
      };
      const expectedError = new Error('Something Broken!');
      saveDoc.mockImplementationOnce(() => Promise.reject(expectedError));

      // Execute
      middleware(Actions.saveInvoice(newInvoice)).then(() => {
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

  describe('should handle INVOICE_DELETE action', () => {
    it('should remove record from DB correctly', () => {
      const invoiceID = 'jon-invoice';
      middleware(Actions.deleteInvoice(invoiceID)).then(() =>
        deleteDoc('invoices', invoiceID).then(data => {
          // Correctly resolves
          expect(data).toEqual([]);
        })
      );
    });

    it('should call next and dispatch notification ', () => {
      // Setup
      const invoiceID = 'jon-invoice';
      const action = Actions.deleteInvoice(invoiceID);
      // Execute
      middleware(action).then(() =>
        deleteDoc('invoices', invoiceID).then(data => {
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
              message: 'Deleted Successfully',
            },
          });
        })
      );
    });

    it('handle error correctly', () => {
      // Setup
      const invoiceID = 'ned-stark';
      const expectedError = new Error('No invoice found!');
      // Execute
      middleware(Actions.deleteInvoice(invoiceID)).then(() => {
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

  it('should handle INVOICE_NEW_FROM_CONTACT action', () => {
    const contact = {
      id: 'jon-snow',
      fullname: 'Jon Snow',
      email: 'jon@hbo.com',
    };
    const action = Actions.newInvoiceFromContact(contact);
    middleware(action);
    // Move to Form Tab
    expect(next.mock.calls.length).toBe(1);
    expect(next).toHaveBeenCalledWith({
      type: ACTION_TYPES.UI_TAB_CHANGE,
      payload: 'form',
    });
    // Update Form recipient data
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPES.FORM_RECIPIENT_UPDATE,
      payload: {
        new: {},
        select: contact,
        newRecipient: false,
      },
    });
  });

  it('let other actions pass through', () => {
    const action = { type: 'TEST' };
    middleware(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
