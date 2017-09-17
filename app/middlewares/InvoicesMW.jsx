// Node Libs
import uuidv4 from 'uuid/v4';
const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;

// PouchDB
const PouchDB = require('pouchdb-browser');
const db = new PouchDB('invoices');

// Actions & Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
import * as UIActions from '../actions/ui';
import * as FormActions from '../actions/form';

// HELPER
const getAllDocs = () =>
  new Promise((resolve, reject) => {
    db
      .allDocs({
        include_docs: true,
        attachments: true,
      })
      .then(results => {
        const resultsDocs = results.rows.map(row => row.doc);
        resolve(resultsDocs);
      })
      .catch(err => {
        reject(err);
      });
  });

// Calculate Subtotal
const getSubtotal = data => {
  // Set all subtotal
  let subtotal = 0;
  data.rows.forEach(row => {
    subtotal += row.subtotal;
  });
  return subtotal;
};

// Calculate Grand Total
const getGrandTotal = data => {
  let grandTotal = getSubtotal(data);
  // Apply Discount
  if (data.discount) {
    if (data.discount.type === 'percentage') {
      grandTotal = grandTotal * (100 - data.discount.amount) / 100;
    } else {
      grandTotal = grandTotal - data.discount.amount;
    }
  }
  // Apply VAT
  if (data.vat) {
    const vatValue = grandTotal * data.vat / 100;
    grandTotal = grandTotal + vatValue;
  }
  return grandTotal;
};

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
      getAllDocs()
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
      break;
    }

    case ACTION_TYPES.INVOICE_SAVE: {
      const { invoiceData, withPreview } = action.payload;
      // Set new document
      const doc = Object.assign({}, invoiceData, {
        _id: uuidv4(),
        created_at: Date.now(),
        currency: invoiceData.currency
          ? invoiceData.currency
          : appConfig.get('appSettings').currency,
        subtotal: getSubtotal(invoiceData),
        grandTotal: getGrandTotal(invoiceData),
      });
      // Save doc to db
      db
        .put(doc)
        .then(getAllDocs)
        .then(newDocs => {
          next({
            type: ACTION_TYPES.INVOICE_SAVE,
            payload: newDocs,
          });
          dispatch({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'success',
              message: 'Inovice Created Successfully'
            }
          });
          // Preview Window
          withPreview && ipc.send('preview-invoice', doc);
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
      break;
    }

    case ACTION_TYPES.INVOICE_DELETE: {
      db
        .get(action.payload)
        .then(doc => db.remove(doc))
        .then(getAllDocs)
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
      break;
    }

    default: {
      next(action);
      break;
    }
  }
};

export default InvoicesMW;
