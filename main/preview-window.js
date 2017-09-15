// Electron Libs
const { BrowserWindow, ipcMain } = require('electron');

// 3rd Party Libs
const appConfig = require('electron-settings');

ipcMain.on('preview-invoice', (event, invoiceData) => {
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
