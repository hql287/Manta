// Node Libs
const path = require('path');
const url  = require('url');
const glob = require('glob');
const os   = require('os');

// Electron Libs
const { app, BrowserWindow, ipcMain } = require('electron');

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

  mainWindow.on('close', event => {
    event.preventDefault();
    mainWindow.webContents.closeDevTools();
    mainWindow.hide();
  });

  ['resize', 'move', 'close'].forEach( event => {
    mainWindow.on(event, storeMainWindowState);
  });

  mainWindow.webContents.on('did-finish-load', () => {
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
    previewWindow.webContents.closeDevTools();
    previewWindow.hide();
  });

  ['resize', 'move', 'close'].forEach( event => {
    previewWindow.on(event, storePreviewWindowState);
  });
}

// Set Initial Values
function setInitialValues() {
  // Save Window IDs
  appConfig.set('mainWindowID', parseInt(mainWindow.id));
  appConfig.set('previewWindowID', parseInt(previewWindow.id));
  // Default Info
  if (!appConfig.has('info')) {
    appConfig.set('info', {
      logo: '',
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
      language: 'en',
      currency: 'USD',
      sound: 'default',
      muted: false,
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
    // Add Event Listener
    ipcMain.on('quit-app', () => {
      previewWindow.destroy();
      mainWindow.destroy();
      app.quit();
    });
  });

  app.on('activate', () => {
    mainWindow.show();
    mainWindow.focus();
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
