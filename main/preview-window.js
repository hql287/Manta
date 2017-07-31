// Node Libs
const path = require('path');
const url = require('url');

// Electron Libs
const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc           = electron.ipcMain;

// 3rd Party Libs
const appConfig = require('electron-settings');

ipc.on('preview-receipt', (event, receiptData) => {
  // Tell MainWindow to show hint
  event.sender.send('show-opening-preview-window-hint');
  // Actually Create The Window
  openPreviewWindow(receiptData, () => {
    // Tell MainWindow to hide hint
    event.sender.send('hide-opening-preview-window-hint');
  });
});

// Show Preview Window & Passdata
function openPreviewWindow(receiptData, cb) {
  const previewWindowID = appConfig.get('previewWindowID');
  const previewWindow   = BrowserWindow.fromId(previewWindowID);
  // Show & Focus
  previewWindow.show();
  previewWindow.focus();
  // Open Dev Tools
  // previewWindow.webContents.openDevTools();
  // Pass Data
  previewWindow.webContents.send('update-preview', receiptData);
  // Execute Callback
  cb();
}
