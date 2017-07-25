// Node Libs
const path = require('path');
const url  = require('url');
const glob = require('glob');

// Electron Libs
const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;

// 3rd Party Libs
const appConfig = require('electron-settings');

let mainWindow      = null;
let mainWindowState = {};

// Create Main Window
function createMainWindow() {
  const mainWindowOptions = {
    x: mainWindowState.bounds && mainWindowState.bounds.x || undefined,
    y: mainWindowState.bounds && mainWindowState.bounds.y || undefined,
    width: mainWindowState.bounds && mainWindowState.bounds.width || 1000,
    height: mainWindowState.bounds && mainWindowState.bounds.height || 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Main Window',
    webPreferences: {
      nodeIntegrationInWorker: true
    },
  };

  mainWindow = new BrowserWindow(mainWindowOptions);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './app/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
    appConfig.set('mainWindowID', mainWindow.id);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ['resize', 'move', 'close'].forEach( event => {
    mainWindow.on(event, storeMainWindowState);
  });

  // Once finished load
  mainWindow.webContents.on('did-finish-load', () => {
    // Open Dev Tools
    mainWindow.webContents.openDevTools();
  });
}

// Initialize
function initialize() {
  // Load all main process files
  loadMainProcessFiles();

  app.on('ready', () => {
    if (appConfig.has('windowState.main')) {
      mainWindowState = appConfig.get('windowState.main');
    }
    // Create The Main Window
    createMainWindow();

    // Set Initial Values
    // appConfig.set('currentDownloads', 0);
    // appConfig.set('downloadingList', false);
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createMainWindow();
    }
  });
}

// Imports Main Process Files
function loadMainProcessFiles() {
  const files = glob.sync(path.join(__dirname, 'main/*.js'));
  files.forEach(file => require(file));
}

// Save Main Window State
function storeMainWindowState() {
  // only update bounds if the window isn't currently maximized
  if (!mainWindowState.isMaximized) {
    mainWindowState.bounds = mainWindow.getBounds();
  }
  mainWindowState.isMaximized = mainWindow.isMaximized();
  appConfig.set('windowState.main', mainWindowState);
}

initialize();
