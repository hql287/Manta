// Node Libs
const path = require('path');
const url = require('url');
const glob = require('glob');
const os = require('os');

// Electron Libs
const {app, BrowserWindow, ipcMain} = require('electron');

// 3rd Party Libs
const appConfig = require('electron-settings');
require('dotenv').config();

let tourWindow = null;
let mainWindow = null;
let previewWindow = null;
let mainWindowState = {};
let previewWindowState = {};

// Create Welcome Window
function createTourWindow() {
  const tourWindowOptions = {
    width: 600,
    height: 600,
    show: false,
    frame: false,
    resizable: false,
    movable: false,
    title: 'Welcome Window',
    backgroundColor: '#F9FAFA',
  };

  tourWindow = new BrowserWindow(tourWindowOptions);

  tourWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './tour/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  tourWindow.on('close', event => {
    event.preventDefault();
    tourWindow.hide();
  });
}

// Create Main Window
function createMainWindow() {
  if (appConfig.has('windowState.main')) {
    mainWindowState = appConfig.get('windowState.main');
  }
  const mainWindowOptions = {
    x: (mainWindowState.bounds && mainWindowState.bounds.x) || undefined,
    y: (mainWindowState.bounds && mainWindowState.bounds.y) || undefined,
    width: (mainWindowState.bounds && mainWindowState.bounds.width) || 1000,
    height: (mainWindowState.bounds && mainWindowState.bounds.height) || 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Main Window',
  };

  mainWindow = new BrowserWindow(mainWindowOptions);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './app/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  mainWindow.on('close', event => {
    event.preventDefault();
    mainWindow.hide();
  });

  ['resize', 'move', 'close'].forEach(event => {
    mainWindow.on(event, storeMainWindowState);
  });
}

// Create Preview Window
function createPreviewWindow() {
  if (appConfig.has('windowState.preview')) {
    previewWindowState = appConfig.get('windowState.preview');
  }
  const previewWindowOptions = {
    x: (previewWindowState.bounds && previewWindowState.bounds.x) || undefined,
    y: (previewWindowState.bounds && previewWindowState.bounds.y) || undefined,
    width:
      (previewWindowState.bounds && previewWindowState.bounds.width) || 1000,
    height:
      (previewWindowState.bounds && previewWindowState.bounds.height) || 800,
    minWidth: 1030,
    minHeight: 1000,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Preview Window',
  };

  previewWindow = new BrowserWindow(previewWindowOptions);

  previewWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './preview/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  previewWindow.on('close', event => {
    event.preventDefault();
    previewWindow.hide();
  });

  ['resize', 'move', 'close'].forEach(event => {
    previewWindow.on(event, storePreviewWindowState);
  });
}

// Add Devtool Extensions
function addDevToolsExtension() {
  BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH);
  BrowserWindow.addDevToolsExtension(process.env.REDUX_DEV_TOOLS_PATH);
}

// Set Initial Values
function setInitialValues() {
  // Register WindowsIDs with appConfigs
  appConfig.set('tourWindowID', parseInt(tourWindow.id));
  appConfig.set('mainWindowID', parseInt(mainWindow.id));
  appConfig.set('previewWindowID', parseInt(previewWindow.id));

  // Tour
  if (!appConfig.has('tour')) {
    appConfig.set('tour', {
      isActive: false,
      hasBeenTaken: false,
    });
  }

  // Windows last state
  if (!appConfig.has('winsLastVisibleState')) {
    appConfig.set('winsLastVisibleState', {
      isMainWinVisible: true,
      isPreviewWinVisible: false
    });
  }

  // Default Info
  if (!appConfig.has('info')) {
    appConfig.set('info', {
      logo: '',
      fullname: '',
      company: '',
      address: '',
      email: '',
      phone: '',
      website: '',
    });
  }
  // Default App Settings
  if (!appConfig.has('appSettings')) {
    appConfig.set('appSettings', {
      exportDir: os.homedir(),
      template: 'default',
      language: 'en',
      currency: 'USD',
      sound: 'default',
      muted: false,
    });
  }
}

// Add Event Listener
function addEventListeners() {
  ipcMain.on('quit-app', () => {
    tourWindow.destroy();
    previewWindow.destroy();
    mainWindow.destroy();
    app.quit();
  });
}

// Initialize
function initialize() {
  // Start the app
  app.on('ready', () => {
    // Create The Welcome Window
    createTourWindow();
    // Create The Main Window
    createMainWindow();
    // Create Preview Window
    createPreviewWindow();
    // Set Initial Values
    setInitialValues();
    // Add Devtools Extenstion
    addDevToolsExtension();
    // Add Event Listener
    addEventListeners();
    // Load all main process files
    loadMainProcessFiles();
    // Show Window
    const { showWindow } = require('./main/tour');
    showWindow('startup');
  });
  // Reactive the app
  app.on('activate', () => {
    const { showWindow } = require('./main/tour');
    showWindow('activate');
  });
}

initialize();

// HELPERS
// ===========================================
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
  appConfig.set('windowState.mainWindow', mainWindowState);
}

// Save Prevew Window State
function storePreviewWindowState() {
  // only update bounds if the window isn't currently maximized
  if (!previewWindowState.isMaximized) {
    previewWindowState.bounds = previewWindow.getBounds();
  }
  previewWindowState.isMaximized = previewWindow.isMaximized();
  appConfig.set('windowState.previewWindow', previewWindowState);
}
