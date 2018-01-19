// Node Libs
const fs = require('fs');
const path = require('path');

// Electron Libs
const { dialog } = require('electron').remote;

const openDialog = require('../renderers/dialog'); // Dialog on errors, warnings, info, etc...
const { pouchDBInvoices, pouchDBContacts } = require('./pouchDB'); // PouchDB helpers
const csvjson = require('csvjson'); // CSV to JSON and JSON to CSV

// Export PouchDB
const exportDB = () => {
  // Save PouchDB as CSV
  const saveFile = () => {
    dialog.showSaveDialog(
      { filters: [{ name: 'CSV', extensions: ['csv'] }] },
      savePath => {
        if (path) {
          // Get Directory from path
          const dir = path.parse(savePath).dir;
          // Check whether you have write permission for directory
          fs.access(dir, fs.constants.W_OK, err => {
            if (err) {
              openDialog({
                type: 'warning',
                title: 'No Write Permission',
                message: `No write permission to ${dir}, please choose a different directory!`,
              });
            } else {
              writeFile(savePath);
            }
          });
        }
      }
    );
  };

  async function writeFile(savePath) {
    const file = fs.createWriteStream(savePath);
    const data = await getData(); // PouchDB JSON Data
    // console.log(data) // TO see how the PouchDB JSON looks like

    if (data) {
      // csvjson options
      const options = {
        delimiter: ',',
        wrap: false,
        headers: 'full',
        objectDenote: '.',
        arrayDenote: '[]',
      };

      file.write(csvjson.toCSV(data, options));
      file.close(); // Close when done
    }
  }

  // Get PouchDB Invoices
  async function getData() {
    let Invoices;
    let Contacts;

    try {
      await pouchDBInvoices().then(invoices => Invoices = invoices);
      await pouchDBContacts().then(contacts => Contacts = contacts);
    } catch (err) {
      openDialog({
        type: 'error',
        title: 'PouchDB Error',
        message: 'Exporting PouchDB to CSV failed!',
      });
    }

    if (Invoices, Contacts) {
      return {Invoices, Contacts};
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
      openPath => {
        if (openPath) {
          fs.access(openPath[0], fs.constants.R_OK, err => {
            if (err) {
              openDialog({
                type: 'warning',
                title: 'No Read Permission',
                message: `No read permission on ${
                  openPath[0]
                }, please make sure you have read permission!`,
              });
            } else {
              // DBLoad()
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
  //
  // openFile();
};

module.exports = {
  exportDB,
  importDB,
};
