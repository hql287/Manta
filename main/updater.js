// Libs
const { BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const appConfig = require('electron-settings');
const isDev = require('electron-is-dev');

// Set mainWindow
const mainWindowID = appConfig.get('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

// Disable Auto Downloading update;
autoUpdater.autoDownload = false;

// Check for update silently
let silentMode = true;

// HANDLING IPC
// Check for updates manually
ipcMain.on('check-for-updates', event => {
  // Turn off silent mode first
  silentMode = false;
  checkForUpdate();
});

// Start Download
ipcMain.on('update-download-started', () => {
  autoUpdater.downloadUpdate();
});

// CHECKING FOR UPDATE EVENTS
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
  };
  mainWindow.send('update-error', errMessage);
});

// DOWNLOADING UPDATE EVENTS
// Download Progress
autoUpdater.on('download-progress', progressObj => {
  mainWindow.send('update-download-progress', progressObj.percent);
});

// Update Downloaded
autoUpdater.on('update-downloaded', info => {
  mainWindow.send('update-downloaded', info);
});

// Main Function
function checkForUpdate() {
  // Only check for update in Production
  if (!isDev) {
    autoUpdater.checkForUpdates();
  }
}

// Check for update on Startup
checkForUpdate();
