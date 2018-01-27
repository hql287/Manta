// Libs
const { BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const appConfig = require('electron-settings');
const isDev = require('electron-is-dev');

const { Notify } = require('../helpers/notify');

// Disable Auto Downloading update;
autoUpdater.autoDownload = false;

// Check for update silently
let silentMode = true;

// Set mainWindow
const mainWindowID = appConfig.get('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

// Check for Updates
ipcMain.on('check-for-updates', event => {
  if (!isDev) {
    // Turn off silent mode
    silentMode = false;
    checkForUpdate();
  }
});

// Start Download
ipcMain.on('update-download-started', () => {
  autoUpdater.downloadUpdate();
});

// All AutoUpdater Events
// ====================================
// Checking for Update
autoUpdater.on('checking-for-update', () => {
  // Only notice user when they checked manually
  if (!silentMode) {
    mainWindow.send('update-checking');
  }
});

// Update Available
autoUpdater.on('update-available', info => {
  mainWindow.send('update-available', info);
});

// Update Not Available
autoUpdater.on('update-not-available', () => {
  // Only notice user when they checked manually
  if (!silentMode) {
    mainWindow.send('update-not-available');
  }
});

// Update Error
autoUpdater.on('error', error => {
  let errMessage;
  if (error == null) {
    errMessage = 'Unknown Error';
  } else {
    errMessage = error.message;
  }
  mainWindow.send('update-error', errMessage);
});

// Download Progress
autoUpdater.on('download-progress', progressObj => {
  mainWindow.send('update-download-progress', progressObj.percent);
});

// Update Downloaded
autoUpdater.on('update-downloaded', info => {
  Notify({ title: 'Manta Update', body: 'Updates has been downloaded' });
  mainWindow.send('update-downloaded', info);
});

// Helper
function checkForUpdate() {
  autoUpdater.checkForUpdates();
}

module.exports = {
  checkForUpdate,
};
