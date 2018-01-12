// Libs
const { BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const { checkForUpdate } = require('./updater');
const appConfig = require('electron-settings');

const checkUpdate = appConfig.get('general.checkUpdate');
const lastCheck = appConfig.get('general.lastCheck');
const now = Date.now();

const daysSinceLastCheck = Math.round(
  Math.abs(now - lastCheck) / (1000 * 60 * 60 * 24)
);

if (checkUpdate === 'daily' && daysSinceLastCheck >= 1) {
  checkForUpdate();
  appConfig.set('general.lastCheck', Date.now()); // Reset last check timeStamp
}

if (checkUpdate === 'weekly' && daysSinceLastCheck >= 7) {
  checkForUpdate();
  appConfig.set('general.lastCheck', Date.now()); // Reset last check timeStamp
}
