// Electron Libs
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

ipc.on('open-file-dialog', event => {
  dialog.showOpenDialog(
    {
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'svg'] }],
    },
    file => {
      if (file) event.sender.send('file-selected', file[0]);
    }
  );
});
