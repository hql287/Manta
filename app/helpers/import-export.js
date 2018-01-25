// Node Libs
const fs = require('fs');
const path = require('path');

// Electron Libs
const { dialog } = require('electron').remote;

const openDialog = require('../renderers/dialog'); // Dialog on errors, warnings, info, etc...
const { getAllDocs } = require('./pouchDB'); // PouchDB helpers

// Export PouchDB
const exportDB = () => {
  // Save PouchDB as CSV
  const saveFile = () => {
    dialog.showSaveDialog(
      { filters: [{ name: 'CSV', extensions: ['csv'] }] },
      savePath => {
        if (savePath) {
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

  // Convert JSON to CSV
  const convert = data => {
    const obj = {};
    const keys = [];
    const rows = {};
    let totalKeys = 0;

    // Add keys and values to "obj"
    const add = (key, value, parentKey) => {
      if (parentKey && (!obj[parentKey] || !obj[parentKey][key])) {
        if (!obj[parentKey]) {
          obj[parentKey] = {};
        }
        if (!obj[parentKey][key]) {
          obj[parentKey][key] = [];
          keys.push(parentKey + '.' + key);
          totalKeys++;
        }
      } else if (!obj[key] && !parentKey) {
        obj[key] = [];
        keys.push(key);
        totalKeys++;
      }
      if (parentKey) {
        obj[parentKey][key].push(value);
      } else {
        obj[key].push(value);
      }
    };

    // Loop through the JSON Object
    // and merge all duplicated keys into one.
    const loopify = (input, parentKey) => {
      for (const key in input) {
        if (Array.isArray(input[key])) {
          for (const index in input[key]) {
            loopify(input[key][index], key);
            parentKey = false;
          }
        } else if (typeof input[key] === 'object') {
          loopify(input[key], key);
          parentKey = false;
        } else {
          if (key !== '_rev') {
            // Dont save _rev
            add(key, input[key], parentKey);
          }
        }
      }
    };

    // Get list of keys
    const getKeys = () => keys;

    // Generate the CSV
    const getValues = () => {
      const keys = getKeys();
      let csv = '';

      // Convert JSON Object into
      // correct CSV format.
      for (const key in obj) {
        const item = obj[key];
        for (const index in item) {
          for (const column in keys) {
            if (typeof item === 'object' && !Array.isArray(item)) {
              for (const subKey in item[index]) {
                if (`${key}.${index}` === keys[column]) {
                  if (!rows[subKey]) {
                    rows[subKey] = [];
                    for (let k = totalKeys; k >= 1; k--) {
                      rows[subKey].push(' ');
                    }
                  }
                  rows[subKey].splice(column, 1, item[index][subKey]);
                }
              }
            } else {
              if (key === keys[column]) {
                if (!rows[index]) {
                  rows[index] = [];
                  for (let k = totalKeys; k >= 1; k--) {
                    rows[index].push(' ');
                  }
                }
                rows[index].splice(column, 1, item[index]);
              }
            }
          }
        }
      }

      // Make it all a string and add
      // 'new line' at the end of each row.
      for (const key in keys) {
        if (typeof keys[key] === 'object' && !Array.isArra(keys[key])) {
          for (const k in keys[key]) {
            if (keys[key][k]) {
              csv += keys[key][k] + ',';
            }
          }
        } else {
          csv += keys[key] + ',';
        }
      }
      csv += '\n';
      for (const row in rows) {
        csv += rows[row].join(',') + '\n';
      }

      return csv;
    };

    loopify(data);
    const values = getValues();

    return values;
  };

  async function writeFile(savePath) {
    const file = fs.createWriteStream(savePath);
    const data = await getData(); // PouchDB JSON Data
    // console.log(data)

    const CSVInvoices = await convert(data.invoices);
    // const CSVContacts = await convert(data.contacts)

    if (data) {
      file.write(CSVInvoices);
      file.close();
    }
  }

  // Get PouchDB Invoices
  async function getData() {
    let Invoices;
    let Contacts;

    try {
      await getAllDocs('invoices').then(invoices => (Invoices = invoices));
      await getAllDocs('contacts').then(contacts => (Contacts = contacts));
    } catch (err) {
      openDialog({
        type: 'error',
        title: 'PouchDB Error',
        message: 'Exporting PouchDB to CSV failed!',
      });
    }

    if (Invoices && Contacts) {
      return { invoices: { docs: Invoices }, contacts: { docs: Contacts } };
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
