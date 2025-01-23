import faker from 'faker';
import uuidv4 from 'uuid/v4';

const contactDoc = {
  id: 'jon-snow',
  fullname: 'Jon Snow',
  email: 'jon@hbo.com',
};

const invoiceDoc = {
  id: 'jon-invoice',
  recipient: {
    fullname: 'Jon Snow',
    email: 'jon@hbo.com',
  },
  rows: [
    {
      id: uuidv4(),
      description: 'Dragons',
      price: '100',
      quantity: '3',
    },
  ],
};

const mockData = {
  contactsRecords: [contactDoc],
  invoicesRecords: [invoiceDoc],
};

const getAllDocs = jest.fn(
  dbName =>
    new Promise((resolve, reject) => {
      switch (dbName) {
        case 'contacts':
          resolve(mockData.contactsRecords);
        case 'invoices':
          resolve(mockData.invoicesRecords);
        default:
          reject(new Error('Incorrect database!'));
      }
    })
);

const saveDoc = jest.fn(
  (dbName, doc) =>
    new Promise((resolve, reject) => {
      !dbName && reject(new Error('No database found!'));
      !doc && reject(new Error('No doc found!'));
      dbName === 'contacts' && resolve([...mockData.contactsRecords, doc]);
      dbName === 'invoices' && resolve([...mockData.invoicesRecords, doc]);
    })
);

const updateDoc = jest.fn(
  (dbName, doc) =>
    new Promise((resolve, reject) => {
      !dbName && reject(new Error('No database found!'));
      !doc && reject(new Error('No doc found!'));
      dbName === 'contacts' && resolve([...mockData.contactsRecords]);
      dbName === 'invoices' && resolve([...mockData.invoicesRecords]);
    })
);

const getSingleDoc = jest.fn(
  (dbName, docID) =>
    new Promise((resolve, reject) => {
      !dbName && reject(new Error('No database found!'));
      !docID && reject(new Error('No docID found!'));
      dbName === 'contacts' && resolve([...mockData.contactsRecords][0]);
      dbName === 'invoices' && resolve([...mockData.invoicesRecords][0]);
    })
);

const deleteDoc = jest.fn(
  (dbName, docId) =>
    new Promise((resolve, reject) => {
      !dbName && reject(new Error('No database found!'));
      !docId && reject(new Error('No docID found!'));
      if (dbName === 'contacts') {
        docId == contactDoc.id
          ? resolve([])
          : reject(new Error('No contact found!'));
      }
      if (dbName === 'invoices') {
        docId == invoiceDoc.id
          ? resolve([])
          : reject(new Error('No invoice found!'));
      }
    })
);


module.exports = {
  getAllDocs,
  getSingleDoc,
  saveDoc,
  updateDoc,
  deleteDoc,
  mockData,
};
