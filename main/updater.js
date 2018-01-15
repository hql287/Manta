// Libs
const { BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const appConfig = require('electron-settings');
const isDev = require('electron-is-dev');

// Disable Auto Downloading update;
autoUpdater.autoDownload = false;

// Set mainWindow
const mainWindowID = appConfig.get('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

  // Check for Updates
ipcMain.on('check-for-updates', event => {
  if(!isDev) checkForUpdate();
});

// Start Download
ipcMain.on('update-download-started', () => {
  autoUpdater.downloadUpdate();
});

// All AutoUpdater Events
// ====================================
// Checking for Update
autoUpdater.on('checking-for-update', () => {
  mainWindow.send('update-checking');
});

// Update Available
autoUpdater.on('update-available', info => {
  mainWindow.send('update-available', info);
});

// Update Not Available
autoUpdater.on('update-not-available', () => {
  mainWindow.send('update-not-available');
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
  const message = `Downloaded ${progressObj.percent} %`;
  mainWindow.send('update-download-progress', message);
});

// Update Downloaded
autoUpdater.on('update-downloaded', info => {
  mainWindow.send('update-downloaded', info);
});

// Helper
function checkForUpdate() {
  autoUpdater.checkForUpdates();
}

module.exports = {
  checkForUpdate,
};
