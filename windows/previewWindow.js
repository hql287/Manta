import appConfig from 'electron-settings';
import isDev from 'electron-is-dev';
import { BrowserWindow } from 'electron';
import { windowStateKeeper } from '../utils/windowStateKeeper.js';
import path from 'path';
import url, { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let previewWindow = null;

export function createPreviewWindow() {
  // Get window state
  const previewWindownStateKeeper = windowStateKeeper('preview');

  // Create New Window
  previewWindow = new BrowserWindow({
    x: previewWindownStateKeeper.x,
    y: previewWindownStateKeeper.y,
    width: previewWindownStateKeeper.width,
    height: previewWindownStateKeeper.height,
    minWidth: 1024,
    minHeight: 800,
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Preview Window',
  });

  // Register WindowID
  appConfig.set('previewWindowID', parseInt(previewWindow.id));

  // Track window state
  previewWindownStateKeeper.track(previewWindow);

  // Load Content
  previewWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './preview/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Add Event Listener
  previewWindow.on('show', event => {
    if (isDev || forceDevtools) previewWindow.webContents.openDevTools({ mode: 'detach' });
  });
  previewWindow.on('close', event => {
    event.preventDefault();
    if (isDev || forceDevtools) previewWindow.webContents.closeDevTools();
    previewWindow.hide();
  });
}
