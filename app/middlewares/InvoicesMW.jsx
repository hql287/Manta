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
  data.rows.forEach((row, index) => {
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
    case ACTION_TYPES.GET_INVOICES: {
      getAllDocs()
        .then(allDocs => {
          dispatch(Object.assign({}, action, {
            data: allDocs,
          }));
        });
      break;
    }

    case ACTION_TYPES.SAVE_INVOICE: {
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
          dispatch({
            type: ACTION_TYPES.SAVE_INVOICE,
            data: newDocs,
          });
        });
      break;
    }

    case ACTION_TYPES.DELETE_INVOICE: {
      db
        .get(action._id)
        .then(doc => db.remove(doc))
        .then(getAllDocs)
        .then(remainingDocs => {
          dispatch({
            type: ACTION_TYPES.DELETE_INVOICE,
            data: remainingDocs,
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
