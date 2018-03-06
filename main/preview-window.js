// Libs
const { BrowserWindow, ipcMain } = require('electron');
const appConfig = require('electron-settings');
const previewWindowID = appConfig.get('previewWindowID');
const previewWindow = BrowserWindow.fromId(previewWindowID);
const mainWindowID = appConfig.get('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

ipcMain.on('preview-invoice', (event, invoiceData) => {
  // Show & Focus
  previewWindow.show();
  previewWindow.focus();
  // Pass Data
  previewWindow.webContents.send('update-preview', invoiceData);
});

// Update Preview window Config
ipcMain.on('update-preview-window', (event, newConfigs) => {
  previewWindow.webContents.send('update-preview-window', newConfigs);
});

// Change UI language for Preview Window
ipcMain.on('change-preview-window-language', (event, newLang) => {
  previewWindow.webContents.send('change-preview-window-language', newLang);
});

// Change invoice profile
ipcMain.on('change-preview-window-profile', (event, newProfile) => {
  previewWindow.webContents.send('change-preview-window-profile', newProfile);
});

// Save configs to invoice
ipcMain.on('save-configs-to-invoice', (event, invoiceID, configs) => {
  mainWindow.webContents.send('save-configs-to-invoice', invoiceID, configs);
});
