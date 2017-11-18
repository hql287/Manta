const {
  app,
  autoUpdater,
  ipcMain,
  dialog
} = require('electron');
const os       = require('os');
const isDev    = require('electron-is-dev');
const version  = app.getVersion();
const platform = os.platform() + '_' + os.arch();

let mainWindow;

// Set Update Feed
const updaterFeedURL = 'https://manta-ray-updater.herokuapp.com/' + platform + '/' + version;

function appUpdater() {
  autoUpdater.setFeedURL(updaterFeedURL);

  // Error Checking For Update
  autoUpdater.on('error', err => {
    sendStatusToWindow('Error: ' + err, 'error');
  });

  // Checking For Update
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for updates');
  });

  // Update Available
  autoUpdater.on('update-available', () => {
    sendStatusToWindow('Update Available!');
  });

  // Update Not Available
  autoUpdater.on('update-not-available', () => {
    sendStatusToWindow('Update NOT Available');
  });

  // Ask the user if update is available
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    let message =
      app.getName() +
      ' ' +
      releaseName +
      ' is now available. It will be installed the next time you restart the application.';
    if (releaseNotes) {
      const splitNotes = releaseNotes.split(/[^\r]\n/);
      message += '\n\nRelease notes:\n';
      splitNotes.forEach(notes => {
        message += notes + '\n\n';
      });
    }
    // Ask user to update the app
    dialog.showMessageBox(
      {
        type: 'question',
        buttons: ['Install and Relaunch', 'Later'],
        defaultId: 0,
        message: 'A new version of ' + app.getName() + ' has been downloaded',
        detail: message,
      },
      response => {
        if (response === 0) {
          setTimeout(() => autoUpdater.quitAndInstall(), 1);
        }
      }
    );
  });

  // Check for Updates
  autoUpdater.checkForUpdates();
}

ipcMain.on('check-for-updates', event => {
  // Set mainWindow
  mainWindow = event.sender;
  // Check for Updates
  if (!isDev) appUpdater();
});

function sendStatusToWindow(text, type = 'info') {
  mainWindow.send('check-for-updates-message', text, type);
}
