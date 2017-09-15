// Electron Libs
const {app, Menu, BrowserWindow} = require('electron').remote;
const appConfig = require('electron').remote.require('electron-settings');

// Get Windows Objects
const mainWindowID = appConfig.get('mainWindowID');
const prevWindowID = appConfig.get('previewWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);
const prevWindow = BrowserWindow.fromId(prevWindowID);

// Set App Menu
const menuTemplate = [
  // Invoice
  {
    label: 'Invoice',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click() {
          mainWindow.webContents.send('menu-change-tab', 'form');
        },
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click() {
          mainWindow.webContents.send('menu-invoice-save');
        },
      },
      {
        label: 'Reset',
        accelerator: 'CmdOrCtrl+R',
        click() {
          mainWindow.webContents.send('menu-invoice-clear');
        },
      },
      {type: 'separator'},
      {
        label: 'Add Item',
        accelerator: 'CmdOrCtrl+I',
        click() {
          mainWindow.webContents.send('menu-invoice-add-item');
        },
      },
      {type: 'separator'},
      {
        label: 'Toggle',
        submenu: [
          {
            label: 'Toggle Due Date',
            accelerator: 'Alt+T',
            click() {
              mainWindow.webContents.send('menu-invoice-toggle-dueDate');
            },
          },
          {
            label: 'Toggle Currency',
            accelerator: 'Alt+C',
            click() {
              mainWindow.webContents.send('menu-invoice-toggle-currency');
            },
          },
          {
            label: 'Toggle VAT',
            accelerator: 'Alt+V',
            click() {
              mainWindow.webContents.send('menu-invoice-toggle-vat');
            },
          },
          {
            label: 'Toggle Discount',
            accelerator: 'Alt+D',
            click() {
              mainWindow.webContents.send('menu-invoice-toggle-discount');
            },
          },
          {
            label: 'Toggle Note',
            accelerator: 'Alt+N',
            click() {
              mainWindow.webContents.send('menu-invoice-toggle-note');
            },
          },
        ],
      },
    ],
  },

  // Go To
  {
    label: 'Go',
    submenu: [
      {
        label: 'Invoices',
        accelerator: 'CmdOrCtrl+Shift+A',
        click() {
          mainWindow.webContents.send('menu-change-tab', 'invoices');
        },
      },
      {
        label: 'Contacts',
        accelerator: 'CmdOrCtrl+Shift+D',
        click() {
          mainWindow.webContents.send('menu-change-tab', 'contacts');
        },
      },
      {
        label: 'Settings',
        accelerator: 'CmdOrCtrl+Shift+S',
        click() {
          mainWindow.webContents.send('menu-change-tab', 'settings');
        },
      },
    ],
  },

  // Edit
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'},
    ],
  },

  // View Menu
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'togglefullscreen'},
    ],
  },

  // Windows
  {
    role: 'window',
    submenu: [{role: 'minimize'}, {role: 'close'}],
  },

  // Help
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          require('electron').shell.openExternal('https://www.paprless.co');
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({
    label: 'My App',
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {
        label: 'Quite App',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          prevWindow.destroy();
          app.quit();
        }
      }
    ],
  });
}

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
