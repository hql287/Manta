// Node Libs
const fs = require('fs');
const nodePath = require('path');
// Electron libs
const { dialog } = require('electron').remote
// Dialog on errors / Warnings
const openDialog = require('../renderers/dialog');
// PouchDB helpers for Exporting
const { pouchDBInvoices, pouchDBContacts } = require('./pouchDB');
// CSV to JSON and JSON to CSV
const csvjson = require('csvjson');

const onError = ({ type, title, message }) => {
  openDialog({
    type,
    title,
    message,
  });
};

// Export PouchDB
const exportDB = () => {
  // Save PouchDB as CSV
  const saveFile = () => {
    dialog.showSaveDialog({filters: [{ name: 'CSV', extensions: ['csv'] }] },
      path => {
        if (path) {
          // Get Directory from path
          const dir = nodePath.parse(path).dir;
          // Check whether you have write permission for directory
          fs.access(dir, fs.constants.W_OK, err => {
            if (err) {
              onError({
                type: 'warning',
                title: 'No Access Permission',
                message: `Cant access ${path}, please choose a different directory!`,
              });
            } else {
              const file = fs.createWriteStream(path);
              const json = DBDump();

              // csvjson options
              const options = {
                delimiter: ',',
                wrap: false,
                headers: 'full',
                objectDenote: '.',
                arrayDenote: '[]',
              };

              file.write(csvjson.toCSV(json, options));
            }
          });
        }
      }
    );
  };

  // Get PouchDB Invoices and Contacts
  const DBDump = () => {
    try {
      pouchDBInvoices().then(val =>{
        const invoices = val
      })
    } catch (err) {
      onError(err)
    }

    try {
      pouchDBContacts().then(val => {
        const contacts = val
      })
    } catch (err) {
      onError(err)
    }

    if (invoices, contacts) {
      return {invoices, contacts}
    }
  }

   saveFile();
};

// Import PouchDB
const importDB = () => {
  const openFile = () => {
    dialog.showOpenDialog(
      {
        filters: [{ name: 'CSV', extensions: ['csv'] }],
        properties: ['openFile'],
      },
      path => {
        if (path) {
          fs.access(path[0], fs.constants.R_OK, err => {
            if (err) {
              onError({
                type: 'warning',
                title: 'No Access Permission',
                message: `Cant access ${
                  path[0]
                }, please choose a different directory!`,
              });
            } else {
              return path[0];
            }
          });
        }
      }
    );
  };

  // const DBLoad = () => {
  //   // Read the CSV file
  //   const data = fs.readFileSync(path, 'utf8');

  //   if (data) {
  //     const options = {
  //       delimiter: ',',
  //       quote: '"',
  //     };

  //     // TODO: This does not output the correct JSON as of now!
  //     const j = csvjson.toSchemaObject(data);
  //     console.log(j);
  //   }
  // }
};

module.exports = {
  exportDB,
  importDB
}
