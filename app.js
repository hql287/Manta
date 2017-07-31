// Node Libs
const path = require('path');
const url  = require('url');
const glob = require('glob');
const os   = require('os');

// Electron Libs
const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;

// 3rd Party Libs
const appConfig = require('electron-settings');

let mainWindow         = null;
let previewWindow      = null;
let mainWindowState    = {};
let previewWindowState = {};

// Create Main Window
function createMainWindow() {
  if (appConfig.has('windowState.main')) {
    mainWindowState = appConfig.get('windowState.main');
  }
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
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ['resize', 'move', 'close'].forEach( event => {
    mainWindow.on(event, storeMainWindowState);
  });

  // Once finished load
  mainWindow.webContents.on('did-finish-load', () => {
    // Save Window ID To Store
    appConfig.set('mainWindowID', parseInt(mainWindow.id));
    // Open Dev Tools
    mainWindow.webContents.openDevTools();
  });
}

// Create Preview Window
function createPreviewWindow() {
  if (appConfig.has('windowState.preview')) {
    previewWindowState = appConfig.get('windowState.preview');
  }
  const previewWindowOptions = {
    x: previewWindowState.bounds && previewWindowState.bounds.x || undefined,
    y: previewWindowState.bounds && previewWindowState.bounds.y || undefined,
    width: previewWindowState.bounds && previewWindowState.bounds.width || 1000,
    height: previewWindowState.bounds && previewWindowState.bounds.height || 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Preview Window',
    webPreferences: {
      nodeIntegrationInWorker: true
    },
  };

  previewWindow = new BrowserWindow(previewWindowOptions);

  previewWindow.loadURL(url.format({
    pathname: path.join(__dirname, './preview/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  previewWindow.on('close', event => {
    event.preventDefault();
    previewWindow.hide();
    previewWindow.webContents.closeDevTools();
  });

  ['resize', 'move', 'close'].forEach( event => {
    previewWindow.on(event, storePreviewWindowState);
  });

  // Once finished load
  previewWindow.webContents.on('did-finish-load', () => {
    // Save Window ID To Store
    appConfig.set('previewWindowID', parseInt(previewWindow.id));
  });
}

// Set Initial Values
function setInitialValues() {
  // Default Info
  if (!appConfig.has('info')) {
    appConfig.set('info', {
      fullname: '',
      company: '',
      address: '',
      email:'',
      phone: '',
      website: '',
    });
  }

  // Default App Settings
  if (!appConfig.has('appSettings')) {
    appConfig.set('appSettings', {
      currency: 'USD',
      muted: false,
      sound: 'default,'
    });
  }

  // Default Print Options
  if (!appConfig.has('printOptions')) {
    appConfig.set('printOptions', {
      exportDir: os.homedir(),
      template: 'default',
      marginsType: 2,
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      landscape: false,
    });
  }
}

// Initialize
function initialize() {
  // Load all main process files
  loadMainProcessFiles();

  app.on('ready', () => {
    // Create The Main Window
    createMainWindow();
    // Create Preview Window
    createPreviewWindow();
    // Set Initial Values
    setInitialValues();
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

// Save Preview Window State
function storePreviewWindowState() {
  // only update bounds if the window isn't currently maximized
  if (!previewWindowState.isMaximized) {
    previewWindowState.bounds = previewWindow.getBounds();
  }
  previewWindowState.isMaximized = previewWindow.isMaximized();
  appConfig.set('windowState.preview', previewWindowState);
}

initialize();
