import { BrowserWindow } from 'electron';
import { centerOnPrimaryDisplay } from '../helpers/center-on-primary-display.js';
import appConfig from 'electron-settings';
import path from 'path';
import url, { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let tourWindow = null;

export function createTourWindow() {
  const width = 700;
  const height = 600;
  const winPOS = centerOnPrimaryDisplay(width, height);

  tourWindow = new BrowserWindow({
    x: winPOS.x,
    y: winPOS.y,
    width,
    height,
    show: false,
    frame: false,
    resizable: false,
    movable: false,
    title: 'Tour Window',
    backgroundColor: '#F9FAFA',
    webPreferences: {
      preload: path.join(__dirname, './tour/preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  appConfig.set('tourWindowID', parseInt(tourWindow.id));

  // Load Content
  tourWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './tour/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  tourWindow.on('show', () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('tour window is shown');
      tourWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  tourWindow.on('close', (event) => {
    event.preventDefault();
    tourWindow.hide();
  });

  return tourWindow;
}
