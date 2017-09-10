// Node Libs
import uuidv4 from 'uuid/v4';
const appConfig = require('electron').remote.require('electron-settings');

// PouchDB
const PouchDB = require('pouchdb-browser');
const db = new PouchDB('invoices');

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

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
    case ACTION_TYPES.INVOICE_GET_ALL: {
      getAllDocs()
        .then(allDocs => {
          next(Object.assign({}, action, {
            data: allDocs,
          }));
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NEW_NOTIFICATION,
            payload: {
              type: 'warning',
              message: err.message
            }
          });
        });
      break;
    }

    case ACTION_TYPES.INVOICE_SAVE: {
      // Set new document
      const doc = Object.assign({}, action.data, {
        _id: uuidv4(),
        created_at: Date.now(),
        currency: action.data.currency
          ? action.data.currency
          : appConfig.get('appSettings').currency,
        subtotal: getSubtotal(action.data),
        grandTotal: getGrandTotal(action.data),
      });
      // Save doc to db
      db
        .put(doc)
        .then(getAllDocs)
        .then(newDocs => {
          next({
            type: ACTION_TYPES.SAVE_INVOICE,
            data: newDocs,
          });
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NEW_NOTIFICATION,
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
        .get(action._id)
        .then(doc => db.remove(doc))
        .then(getAllDocs)
        .then(remainingDocs => {
          next({
            type: ACTION_TYPES.DELETE_INVOICE,
            data: remainingDocs,
          });
          dispatch({
            type: ACTION_TYPES.UI_NEW_NOTIFICATION,
            payload: {
              type: 'success',
              message: 'Deleted Successfully'
            }
          });
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NEW_NOTIFICATION,
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
