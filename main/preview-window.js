// Electron Libs
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

// 3rd Party Libs
const appConfig = require('electron-settings');

ipc.on('preview-invoice', (event, invoiceData) => {
  // Tell MainWindow to show hint
  event.sender.send('show-opening-preview-window-hint');
  // Actually Create The Window
  openPreviewWindow(invoiceData, () => {
    // Tell MainWindow to hide hint
    event.sender.send('hide-opening-preview-window-hint');
  });
});

// Show Preview Window & Passdata
function openPreviewWindow(invoiceData, cb) {
  const previewWindowID = appConfig.get('previewWindowID');
  const previewWindow = BrowserWindow.fromId(previewWindowID);
  // Show & Focus
  previewWindow.show();
  previewWindow.focus();
  // Pass Data
  previewWindow.webContents.send('update-preview', invoiceData);
  // Execute Callback
  cb();
}
