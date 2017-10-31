// Node Libs
const os    = require('os');
const url   = require('url');
const path  = require('path');
const glob  = require('glob');
const isDev = require('electron-is-dev');

// Electron Libs
const {app, BrowserWindow, ipcMain} = require('electron');

// 3rd Party Libs
const appConfig = require('electron-settings');
require('dotenv').config();

let tourWindow = null;
let mainWindow = null;
let previewWindow = null;

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
  tourWindow.on('show', event => {
    if (isDev) tourWindow.webContents.openDevTools();
  });
  tourWindow.on('close', event => {
    event.preventDefault();
    if (isDev) tourWindow.webContents.closeDevTools();
    tourWindow.hide();
  });
}

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
  mainWindow.on('show', event => {
    if (isDev) mainWindow.webContents.openDevTools();
  });
  mainWindow.on('close', event => {
    event.preventDefault();
    if (isDev) mainWindow.webContents.closeDevTools();
    mainWindow.hide();
  });
}

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
  previewWindow.on('show', event => {
    if (isDev) previewWindow.webContents.openDevTools();
  });
  previewWindow.on('close', event => {
    event.preventDefault();
    if (isDev) previewWindow.webContents.closeDevTools();
    previewWindow.hide();
  });
}

function addDevToolsExtension() {
  BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH);
  BrowserWindow.addDevToolsExtension(process.env.REDUX_DEV_TOOLS_PATH);
}

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
      isPreviewWinVisible: false,
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

function addEventListeners() {
  ipcMain.on('quit-app', () => {
    tourWindow.destroy();
    mainWindow.destroy();
    previewWindow.destroy();
    app.quit();
  });
}

function initialize() {
  app.on('ready', () => {
    createTourWindow();
    createMainWindow();
    createPreviewWindow();
    setInitialValues();
    if (isDev) addDevToolsExtension();
    addEventListeners();
    loadMainProcessFiles();
    // Show Window
    const {showWindow} = require('./main/tour');
    showWindow('startup');
  });
  app.on('activate', () => {
    // Reactive the app
    const {showWindow} = require('./main/tour');
    showWindow('activate');
  });
}

initialize();

// Helpers
function loadMainProcessFiles() {
  const files = glob.sync(path.join(__dirname, 'main/*.js'));
  files.forEach(file => require(file));
}

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

  return {
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  };
}
