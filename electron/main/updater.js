import { BrowserWindow, ipcMain } from 'electron';
import pkg from 'electron-updater';
import appConfig from 'electron-settings';

const { autoUpdater } = pkg;

const mainWindowID = appConfig.getSync('mainWindowID');
const mainWindow = mainWindowID ? BrowserWindow.fromId(mainWindowID) : null;

autoUpdater.autoDownload = false;

let silentMode = true;

// IPC Handlers
ipcMain.on('check-for-updates', () => {
  silentMode = false;
  checkForUpdate();
});

ipcMain.on('update-download-started', () => {
  autoUpdater.downloadUpdate();
});

// AutoUpdater Events
autoUpdater.on('checking-for-update', () => {
  if (!silentMode && mainWindow) {
    mainWindow.webContents.send('update-checking');
  }
});

autoUpdater.on('update-available', (info) => {
  if (mainWindow) mainWindow.webContents.send('update-available', info);
});

autoUpdater.on('update-not-available', () => {
  if (!silentMode && mainWindow) {
    mainWindow.webContents.send('update-not-available');
  }
});

autoUpdater.on('error', (error) => {
  const errMessage = error?.message || 'Unknown Error';
  if (mainWindow) mainWindow.webContents.send('update-error', errMessage);
});

autoUpdater.on('download-progress', (progressObj) => {
  if (mainWindow) mainWindow.webContents.send('update-download-progress', progressObj.percent);
});

autoUpdater.on('update-downloaded', (info) => {
  if (mainWindow) mainWindow.webContents.send('update-downloaded', info);
});

function checkForUpdate() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    autoUpdater.checkForUpdates();
  }
}

checkForUpdate();
