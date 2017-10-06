const PouchDB = require('pouchdb-browser');
const contactsDB = new PouchDB('contacts');
const invoicesDB = new PouchDB('invoices');

const setDB = dbName => {
  if (dbName === 'contacts') return contactsDB;
  if (dbName === 'invoices') return invoicesDB;
};

// Get All Document
const getAllDocs = dbName =>
  new Promise((resolve, reject) => {
    const db = setDB(dbName);
    db.allDocs({
        include_docs: true,
        attachments: true,
      })
      .then(results => {
        const resultsDocs = results.rows.map(row => row.doc);
        resolve(resultsDocs);
      })
      .catch(err => reject(err));
  });

// Save a Document
const saveDoc = (dbName, doc) =>
  new Promise((resolve, reject) => {
    const db = setDB(dbName);
    db.put(doc)
      .then(getAllDocs(dbName)
      .then(newDocs => resolve(newDocs)
      ))
      .catch(err => reject(err));
  });

// Delete A Document
const deleteDoc = (dbName, doc) =>
  new Promise((resolve, reject) => {
    const db = setDB(dbName);
    db.get(doc)
      .then(record => db.remove(record)
      .then(getAllDocs(dbName)
      .then(remainingDocs => resolve(remainingDocs)
      )))
      .catch(err => reject(err));
  });

export {
  getAllDocs,
  deleteDoc,
  saveDoc,
}
