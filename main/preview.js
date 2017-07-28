// Node Libs
const path = require('path');
const url = require('url');

// Electron Libs
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

ipc.on('preview-receipt', (event, receiptData) => {
  createPreviewWindow(receiptData);
});

function createPreviewWindow(receiptData) {
  let previewWin = new BrowserWindow({
    width: 1000,
    height: 1200,
    backgroundColor: '#282828',
    titleBarStyle: 'hiddenInset',
    show: false,
  });
  previewWin.loadURL(
    url.format({
      pathname: path.join(__dirname, '../preview/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );
  previewWin.on('close', () => (previewWin = null));
  previewWin.webContents.on('did-finish-load', () => {
    previewWin.webContents.send('update-preview', receiptData);
  });
  previewWin.on('ready-to-show', () => {
    previewWin.show();
    previewWin.focus();
  });
}
