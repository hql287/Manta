import appConfig from 'electron-settings';
import isDev from 'electron-is-dev';
import { BrowserWindow } from 'electron';
import { windowStateKeeper } from '../utils/windowStateKeeper.js';
import path from 'path';
import url, { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;

export function createMainWindow() {
  // Get window state
  const mainWindownStateKeeper = windowStateKeeper('main');
  // Creating a new window
  mainWindow = new BrowserWindow({
    x: mainWindownStateKeeper.x,
    y: mainWindownStateKeeper.y,
    width: mainWindownStateKeeper.width,
    height: mainWindownStateKeeper.height,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Main Window',
  });
  // Register WindowID
  appConfig.set('mainWindowID', parseInt(mainWindow.id));
  // Track window state
  mainWindownStateKeeper.track(mainWindow);
  // Load Content
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../app/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Add Event Listeners
  mainWindow.on('show', event => {
    if (isDev || forceDevtools) mainWindow.webContents.openDevTools({ mode: 'detach' });
  });
  mainWindow.on('close', event => {
    if (process.platform === 'darwin') {
      event.preventDefault();
      if (isDev || forceDevtools) mainWindow.webContents.closeDevTools();
      mainWindow.hide();
    } else {
      app.quit();
    }
  });
}

