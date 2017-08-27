// Node Libs
import uuidv4 from 'uuid/v4';
const appConfig = require('electron').remote.require('electron-settings');

// PouchDB
const PouchDB = require('pouchdb-browser');
const db = new PouchDB('invoices');

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
  const subtotal = getSubtotal(data);
  let grandTotal;
  if ( data.discount ) {
    const discountAmount = data.discount.amount;
    if (data.discount.type === 'percentage') {
      grandTotal = subtotal * (100 - discountAmount) / 100;
    } else {
      grandTotal = subtotal - discountAmount;
    }
  } else {
    grandTotal = subtotal;
  }
  return grandTotal;
};

// EXPORTED ACTIONS
// Get All Invoices
export const getInvoices = () => {
  return dispatch => {
    getAllDocs().then(allDocs => {
      dispatch({
        type: ACTION_TYPES.GET_INVOICES,
        data: allDocs,
      });
    });
  };
};

// Save an Invoice
export const saveInvoice = data => {
  return dispatch => {
    const doc = Object.assign({}, data, {
      _id: uuidv4(),
      created_at: Date.now(),
      currency: data.currency ? data.currency : appConfig.get('appSettings').currency,
      subtotal: getSubtotal(data),
      grandTotal: getGrandTotal(data),
    });
    db.put(doc).then(getAllDocs).then(newDocs => {
      dispatch({
        type: ACTION_TYPES.SAVE_INVOICE,
        data: newDocs,
      });
    });
  };
};

// Delete an invoice
export const deleteInvoice = invoiceId => {
  return dispatch => {
    db
      .get(invoiceId)
      .then(doc => db.remove(doc))
      .then(getAllDocs)
      .then(remainingDocs => {
        dispatch({
          type: ACTION_TYPES.DELETE_INVOICE,
          data: remainingDocs,
        });
      });
  };
};
