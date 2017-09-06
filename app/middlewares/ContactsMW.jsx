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

const ContactsMW = store => next => action => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_CONTACTS: {
      getAllDocs().then(allDocs => {
        next(Object.assign({}, action, {
          data: allDocs,
        }));
      });
      break;
    }

    case ACTION_TYPES.GET_ONE_CONTACT: {
      getSingleDoc(action._id).then(doc => {
        next({
          type: ACTION_TYPES.GET_ONE_CONTACT,
          data: doc,
        });
      });
      break;
    }

    case ACTION_TYPES.SAVE_CONTACT: {
      const doc = Object.assign({}, action.data, {
        _id: uuidv4(),
        created_at: Date.now(),
      });
      db
        .put(doc)
        .then(getAllDocs)
        .then(newDocs => {
          next({
            type: ACTION_TYPES.SAVE_CONTACT,
            data: newDocs,
          });
        });
      break;
    }

    case ACTION_TYPES.DELETE_CONTACT: {
      db
        .get(action._id)
        .then(doc => db.remove(doc))
        .then(getAllDocs)
        .then(remainingDocs => {
          next({
            type: ACTION_TYPES.DELETE_CONTACT,
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

export default ContactsMW;
