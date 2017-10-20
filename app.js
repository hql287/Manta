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

// Create Tour Window
function createTourWindow() {
  // Creating a New Window
  tourWindow = new BrowserWindow({
    width: 700,
    height: 600,
    show: false,
    frame: false,
    resizable: false,
    movable: false,
    title: 'Tour Window',
    backgroundColor: '#F9FAFA',
  });
  // Register WindowID with appConfig
  appConfig.set('tourWindowID', parseInt(tourWindow.id));
  // Load Content
  tourWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './tour/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  // Add Event Listeners
  tourWindow.on('close', event => {
    event.preventDefault();
    tourWindow.hide();
  });
}

// Create Main Window
function createMainWindow() {
  // Get window state
  const mainWindownStateKeeper = windowStateKeeper('main');
  // Creating a new window
  mainWindow = new BrowserWindow({
    x: mainWindownStateKeeper.x,
    y: mainWindownStateKeeper.y,
    width: mainWindownStateKeeper.width,
    height: mainWindownStateKeeper.height,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
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
      pathname: path.join(__dirname, './app/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  // Add Event Listeners
  mainWindow.on('close', event => {
    event.preventDefault();
    mainWindow.hide();
  });
}

// Create Preview Window
function createPreviewWindow() {
  // Get window state
  const previewWindownStateKeeper = windowStateKeeper('preview');
  // Create New Window
  previewWindow = new BrowserWindow({
    x: previewWindownStateKeeper.x,
    y: previewWindownStateKeeper.y,
    width: previewWindownStateKeeper.width,
    height: previewWindownStateKeeper.height,
    minWidth: 1030,
    minHeight: 1000,
    titleBarStyle: 'hiddenInset',
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
  previewWindow.on('close', event => {
    event.preventDefault();
    previewWindow.hide();
  });
}

// Add Devtool Extensions
function addDevToolsExtension() {
  BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH);
  BrowserWindow.addDevToolsExtension(process.env.REDUX_DEV_TOOLS_PATH);
}

// Set Initial Values
function setInitialValues() {
  // Tour
  if (!appConfig.has('tour')) {
    appConfig.set('tour', {
      isActive: false,
      hasBeenTaken: false,
    });
  }
  // Windows last visible state
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
    mainWindow.destroy();
    previewWindow.destroy();
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

// Windows State Keeper
function windowStateKeeper(windowName) {
  let window, windowState;

  function setBounds() {
    // Restore from appConfig
    if (appConfig.has(`windowState.${windowName}`)) {
      windowState = appConfig.get(`windowState.${windowName}`);
      return;
    }
    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: 1000,
      height: 800,
    };
  }

  function saveState() {
    if (!windowState.isMaximized) {
      windowState = window.getBounds();
    }
    windowState.isMaximized = window.isMaximized();
    appConfig.set(`windowState.${windowName}`, windowState);
  }

  function track(win) {
    window = win;
    ['resize', 'move'].forEach(event => {
      win.on(event, saveState);
    });
  }

  setBounds();

  return({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  });
}
