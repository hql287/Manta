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

const ContactsMW = ({dispatch}) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.CONTACT_GET_ALL: {
      getAllDocs()
        .then(allDocs => {
          next(
            Object.assign({}, action, {
              data: allDocs,
            }),
          );
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NEW_NOTIFICATION,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
      break;
    }

    case ACTION_TYPES.CONTACT_SAVE: {
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
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NEW_NOTIFICATION,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
      break;
    }

    case ACTION_TYPES.CONTACT_DELETE: {
      db
        .get(action._id)
        .then(doc => db.remove(doc))
        .then(getAllDocs)
        .then(remainingDocs => {
          next({
            type: ACTION_TYPES.DELETE_CONTACT,
            data: remainingDocs,
          });
          dispatch({
            type: ACTION_TYPES.UI_NEW_NOTIFICATION,
            payload: {
              type: 'success',
              message: 'Deleted Successfully',
            },
          });
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NEW_NOTIFICATION,
            payload: {
              type: 'warning',
              message: err.message,
            },
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
