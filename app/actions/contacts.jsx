// Node Libs
import uuidv4 from 'uuid/v4';

// PouchDB
const PouchDB = require('pouchdb-browser');
const db = new PouchDB('contacts');

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Docs Helper
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

// Get A Single Doc Helper
const getSingleDoc = _id => {
  new Promise((resolve, reject) => {
    db
      .get(_id)
      .then(doc => {
        resolve(doc);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// Get All Contacts
export const getAllContacts = () => {
  return dispatch => {
    getAllDocs().then(allDocs => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_CONTACTS,
        data: allDocs,
      });
    });
  };
};

// Get One Contact
export const getOneContact = _id => {
  return dispatch => {
    getSingleDoc(_id).then(doc => {
      dispatch({
        type: ACTION_TYPES.GET_ONE_CONTACT,
        data: doc,
      });
    });
  };
};

// Save A Contact
export const saveContact = data => {
  // Save To Database
  return dispatch => {
    const doc = Object.assign({}, data, {
      _id: uuidv4(),
      created_at: Date.now(),
    });
    db.put(doc).then(getAllDocs).then(newDocs => {
      dispatch({
        type: ACTION_TYPES.SAVE_CONTACT,
        data: newDocs,
      });
    });
  };
};

// Delete a Invoices
export const deleteContact = contactId => {
  return dispatch => {
    db
      .get(contactId)
      .then(doc => db.remove(doc))
      .then(getAllDocs)
      .then(remainingDocs => {
        dispatch({
          type: ACTION_TYPES.DELETE_CONTACT,
          data: remainingDocs,
        });
      });
  };
};
