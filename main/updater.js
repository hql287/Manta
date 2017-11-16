const {ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');

let mainWindow;

ipcMain.on('check-for-updates', event => {
  // Set mainWindow
  mainWindow = event.sender;
  // Check for Updates
  autoUpdater.checkForUpdates();
});

// Checking for Update
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});

// Update Available
autoUpdater.on('update-available', info => {
  sendStatusToWindow('Update available. ' + info);
});

// Update Not Available
autoUpdater.on('update-not-available', info => {
  sendStatusToWindow('Update not available. ' + info);
});

// Error Handling
autoUpdater.on('error', err => {
  sendStatusToWindow('Updating Error! ' + err, 'error');
});

// Download Progress
autoUpdater.on('download-progress', progressObj => {
  let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message =
    log_message +
    ' (' +
    progressObj.transferred +
    '/' +
    progressObj.total +
    ')';
  sendStatusToWindow(log_message);
});

// Update Downloaded
autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow('Update downloaded. ' + info);
});

// Helper
function sendStatusToWindow(text, type='info') {
  mainWindow.send('check-for-updates-message', text, type);
}
