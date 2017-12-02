const {ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');

// Disable Auto Downloading update;
autoUpdater.autoDownload = false;
let mainWindow;

ipcMain.on('check-for-updates', event => {
  // Set mainWindow
  mainWindow = event.sender;
  // Check for Updates
  autoUpdater.checkForUpdates();
});

// Start Download
ipcMain.on('update-download-started', () => {
  autoUpdater.downloadUpdate();
});

// Upgrade Now
ipcMain.on('upgrade-now', () => {
  autoUpdater.quitAndInstall();
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
    errMessage = error.toString();
  }
  mainWindow.send('update-error', errMessage);
});

// Download Progress
autoUpdater.on('download-progress', progressObj => {
  let message = `Downloaded ${progressObj.percent} %`;
  mainWindow.send('update-download-progress', message);
});

// Update Downloaded
autoUpdater.on('update-downloaded', info => {
  mainWindow.send('update-downloaded', info);
});

