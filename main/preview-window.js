// Electron Libs
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

// 3rd Party Libs
const appConfig = require('electron-settings');

ipc.on('preview-invoice', (event, invoiceData) => {
  openPreviewWindow(invoiceData);
});

// Show Preview Window & Pass Data
function openPreviewWindow(invoiceData) {
  const previewWindowID = appConfig.get('previewWindowID');
  const previewWindow = BrowserWindow.fromId(previewWindowID);
  // Show & Focus
  previewWindow.show();
  previewWindow.focus();
  // Pass Data
  previewWindow.webContents.send('update-preview', invoiceData);
}
