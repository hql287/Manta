console.time('init');

// Node Libs
const fs = require('fs');
const os = require('os');
const url = require('url');
const path = require('path');
const glob = require('glob');
const isDev = require('electron-is-dev');
const omit = require('lodash').omit;

// Electron Libs
const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

// Place a BrowserWindow in center of primary display
const centerOnPrimaryDisplay = require('./helpers/center-on-primary-display');

// commmandline arguments
const forceDevtools = process.argv.includes('--force-devtools');
if (process.argv.includes('--disable-hardware-acceleration')) {
  app.disableHardwareAcceleration();
}

// 3rd Party Libs
const appConfig = require('electron-settings');
require('dotenv').config();

let tourWindow = null;
let mainWindow = null;
let previewWindow = null;

function createTourWindow() {
  const width = 700;
  const height = 600;

  // Get X and Y coordinations on primary display
  const winPOS = centerOnPrimaryDisplay(width, height);

  // Creating a New Window
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
    if (isDev || forceDevtools) tourWindow.webContents.openDevTools({ mode: 'detach' });
  });
  tourWindow.on('close', event => {
    event.preventDefault();
    if (isDev || forceDevtools) tourWindow.webContents.closeDevTools();
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
      pathname: path.join(__dirname, './app/index.html'),
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

function createPreviewWindow() {
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

function addDevToolsExtension() {
  if (process.env.DEVTRON_DEV_TOOLS_PATH)
    BrowserWindow.addDevToolsExtension(process.env.DEVTRON_DEV_TOOLS_PATH);
  if (process.env.REACT_DEV_TOOLS_PATH)
    BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH);
  if (process.env.REDUX_DEV_TOOLS_PATH)
    BrowserWindow.addDevToolsExtension(process.env.REDUX_DEV_TOOLS_PATH);
}

function setInitialValues() {
  // Default Logo
  const logoPath = path.resolve(__dirname, './static/imgs/default_logo.svg');
  const logoData = fs.readFileSync(logoPath);
  const logoBase64String =
    'data:image/svg+xml;base64,' + logoData.toString('base64');
  // Default Options
  const defaultOptions = {
    tour: {
      isActive: false,
      hasBeenTaken: false,
    },
    winsLastVisibleState: {
      isMainWinVisible: true,
      isPreviewWinVisible: false,
    },
    profile: {
      logo: logoBase64String,
      fullname: 'Manta Ray',
      company: 'Oceanic Preservation Society',
      address: '336 Bon Air Center #384 Greenbrae, CA 94904',
      email: 'info@opsociety.org',
      phone: '+01 (0) 1-2345-6789',
      website: 'http://www.opsociety.org/',
    },
    general: {
      language: 'en',
      sound: 'default',
      muted: false,
      previewPDF: true,
      checkUpdate: 'daily',
      lastCheck: Date.now(),
    },
    invoice: {
      exportDir: os.homedir(),
      template: 'default',
      dateFormat: 'MM/DD/YYYY',
      tax: {
        tin: '123-456-789',
        method: 'default',
        amount: 0,
      },
      currency: {
        code: 'USD',
        placement: 'before',
        separator: 'commaDot',
        fraction: 2,
      },
      required_fields: {
        invoiceID: false,
        dueDate: false,
        currency: false,
        discount: false,
        tax: false,
        note: false,
      },
    },
  };

  // Set initial values conditionally work for 2 level depth key only,
  // Changing anything deeper would need to be done with migration
  for (const key in defaultOptions) {
    // Add level 1 key if not exist
    if (Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
      if (!appConfig.has(`${key}`)) {
        appConfig.set(`${key}`, defaultOptions[key]);
      }
      // Add level 2 key if not exist
      for (const childKey in defaultOptions[key]) {
        if (Object.prototype.hasOwnProperty.call(defaultOptions[key], childKey)) {
          if (!appConfig.has(`${key}.${childKey}`)) {
            appConfig.set(`${key}.${childKey}`, defaultOptions[key][childKey]);
          }
        }
      }
    }
  }
}

function migrateData() {
  // Migration scheme
  const migrations = {
    1: configs => {
      // Get the current configs
      const { info, appSettings } = configs;
      // Return current configs if this is the first time install
      if (info === undefined || appSettings === undefined) {
        return configs;
      }
      // Update current configs
      const migratedConfigs = Object.assign({}, configs, {
        profile: info,
        general: {
          language: appSettings.language,
          sound: appSettings.sound,
          muted: appSettings.muted,
        },
        invoice: {
          exportDir: appSettings.exportDir,
          template: appSettings.template,
          currency: appSettings.currency,
          dateFormat: 'MM/DD/YYYY',
          tax: {
            tin: '123-456-789',
            method: 'default',
            amount: 0,
          },
          required_fields: {
            dueDate: false,
            currency: false,
            discount: false,
            tax: false,
            note: false,
          },
        },
      });
      // Omit old keys
      return omit(migratedConfigs, [
        'info',
        'appSettings',
        'printOptions',
        'test',
      ]);
    },

    2: configs => {
      // Return current configs if this is the first time install
      if ( configs.invoice.currency.placement !== undefined) {
        return configs;
      }
      // Update current configs
      return Object.assign({}, configs, {
        invoice: Object.assign({}, configs.invoice, {
          currency: {
            code: configs.invoice.currency,
            placement: 'before',
            separator: 'commaDot',
            fraction: 2,
          }
        })
      });
    },

    3: configs => {
      // Return current configs if checkUpdate and lastCheck do not exist
      const { checkUpdate, lastCheck} = configs.general;
      if ( checkUpdate === undefined || lastCheck === undefined ) {
        return configs;
      }
      // Remove checkUpdate and lastCheck
      return Object.assign({}, configs, {
        general: omit(configs.general, ['checkUpdate', 'lastCheck'])
      });
    },
  };
  // Get the current Config
  const configs = appConfig.getAll();
  // Get the current configs
  const version = appConfig.get('version') || 0;
  // Handle migration
  const newMigrations = Object.keys(migrations)
    .filter(k => k > version)
    .sort();
  // Exit if there's no migration to run
  if (!newMigrations.length) return;
  // If there's migration to run run the current
  // config through each migration
  const migratedConfigs = newMigrations.reduce(
    (prev, key) => migrations[key](prev),
    configs
  );
  // Save the final config to DB
  appConfig.deleteAll().setAll(migratedConfigs);
  // Update the latest config version
  appConfig.set('version', newMigrations[newMigrations.length - 1]);
}

function addEventListeners() {
  ipcMain.on('quit-app', () => {
    app.quit();
  });
  // Quit and install
  // https://github.com/electron-userland/electron-builder/issues/1604#issuecomment-306709572
  ipcMain.on('quit-and-install', () => {
    setImmediate(() => {
      // Remove this listener
      app.removeAllListeners("window-all-closed");
      // Force close all windows
      tourWindow.destroy();
      mainWindow.destroy();
      previewWindow.destroy();
      // Start the quit and update sequence
      autoUpdater.quitAndInstall(false);
    })
  });
}

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

function initialize() {
  app.on('ready', () => {
    createTourWindow();
    createMainWindow();
    createPreviewWindow();
    setInitialValues();
    migrateData();
    if (isDev) addDevToolsExtension();
    addEventListeners();
    loadMainProcessFiles();
    // Show Window
    const { showWindow } = require('./main/tour');
    showWindow('startup');
  });
  // Reactivate the app
  app.on('activate', () => {
    const { showWindow } = require('./main/tour');
    showWindow('activate');
  });
  // Close all windows before quit the app
  app.on('before-quit', () => {
    // Use condition in case quit sequence is initiated by autoUpdater
    // which will destroy all there windows already before emitting this event
    if (tourWindow !== null) tourWindow.destroy();
    if (mainWindow !== null) mainWindow.destroy();
    if (previewWindow !== null) previewWindow.destroy();
  });
  console.timeEnd('init');
}

initialize();
