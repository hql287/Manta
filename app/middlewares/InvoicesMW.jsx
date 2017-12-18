// Node Libs
import uuidv4 from 'uuid/v4';
import currencies from '../../libs/currencies.json';
const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;

// Actions & Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
import * as UIActions from '../actions/ui';
import * as FormActions from '../actions/form';

// Helpers
import { getSubtotal, getGrandTotal } from '../helpers/invoice';
import { getAllDocs, saveDoc, deleteDoc, updateDoc } from '../helpers/pouchDB';

const InvoicesMW = ({ dispatch }) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.INVOICE_NEW_FROM_CONTACT: {
      // Change Tab to Form
      next(UIActions.changeActiveTab('form'));
      // Update Recipient Data
      dispatch(FormActions.updateRecipient({
        new: {},
        select: action.payload,
        newRecipient: false,
      }));
    }

    case ACTION_TYPES.INVOICE_GET_ALL: {
      return getAllDocs('invoices')
        .then(allDocs => {
          next(Object.assign({}, action, {
            payload: allDocs,
          }));
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message
            }
          });
        });
    }

    case ACTION_TYPES.INVOICE_SAVE: {
      const invoiceData = action.payload;
      // Set new document
      const doc = Object.assign({}, invoiceData, {
        _id: uuidv4(),
        created_at: Date.now(),
        status: 'pending',
        currency: invoiceData.currency
          ? invoiceData.currency
          : currencies[appConfig.get('appSettings.currency')],
        subtotal: getSubtotal(invoiceData),
        grandTotal: getGrandTotal(invoiceData),
      });
      // Save doc to db
      return saveDoc('invoices', doc)
        .then(newDocs => {
          next({
            type: ACTION_TYPES.INVOICE_SAVE,
            payload: newDocs,
          });
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: 'Invoice Created Successfully'
            }
          });
          // Preview Window
         ipc.send('preview-invoice', doc);
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message
            }
          });
        });
    }

    case ACTION_TYPES.INVOICE_DELETE: {
      return deleteDoc('invoices', action.payload)
        .then(remainingDocs => {
          next({
            type: ACTION_TYPES.INVOICE_DELETE,
            payload: remainingDocs
          });
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: 'Deleted Successfully'
            }
          });
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message
            }
          });
        });
    }

    case ACTION_TYPES.INVOICE_SET_STATUS: {
      return updateDoc('invoices', action.payload.invoiceID, { status: action.payload.status })
        .then(docs => {
          next({
            type: ACTION_TYPES.INVOICE_SET_STATUS,
            payload: docs
          });
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: 'Updated Successfully'
            }
          });
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message
            }
          });
        });
    }

    default: {
      return next(action);
    }
  }
};

export default InvoicesMW;
