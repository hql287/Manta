// Node Libs
const path = require('path');

// Electron Libs
const ipc = require('electron').ipcMain;

// 3rd Party Libs
const Datastore = require('nedb');
const receipts_db = new Datastore({
  filename: path.join(__dirname, './db/receipts.db'),
  autoload: true,
});

ipc.on('save-receipt', (event, receipt) => {
  receipts_db.insert(receipt, function(err, savedReceipt) {
    console.log('Saved: ', savedReceipt);
  });
});
