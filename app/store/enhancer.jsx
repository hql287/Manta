import { getAllDocs } from '../helpers/pouchDB';

// Retrieve Initial state from IndexDB
const getInitialState = () =>
  Promise.all([getAllDocs('contacts'), getAllDocs('invoices')])
    .then(values => ({
      contacts: values[0],
      invoices: values[1],
    }))
    .catch(err => console.log(err));

export { getInitialState };
