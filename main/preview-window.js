// Libs
const { BrowserWindow, ipcMain } = require('electron');
const appConfig = require('electron-settings');
const previewWindowID = appConfig.get('previewWindowID');
const previewWindow = BrowserWindow.fromId(previewWindowID);

ipcMain.on('preview-invoice', (event, invoiceData) => {
  // Show & Focus
  previewWindow.show();
  previewWindow.focus();
  // Pass Data
  previewWindow.webContents.send('update-preview', invoiceData);
});

ipcMain.on('update-preview-window', (event, newConfigs) => {
  previewWindow.webContents.send('update-preview-window', newConfigs);
});
