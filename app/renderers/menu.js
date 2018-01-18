// Libs
const { Menu, BrowserWindow } = require('electron').remote;
const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;
const isDev = require('electron-is-dev');

// Get mainWindow Object
const mainWindowID = appConfig.get('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

const aboutMenu = {
  label: 'My App',
  submenu: [
    { role: 'about' },
    { type: 'separator' },
    {
      label: 'Check For Updates',
      accelerator: 'CmdOrCtrl+U',
      click() {
        ipc.send('check-for-updates');
      },
    },

    { type: 'separator' },
    { role: 'services', submenu: [] },
    { type: 'separator' },
    { role: 'hide' },
    { role: 'hideothers' },
    { role: 'unhide' },
    { type: 'separator' },
    {
      label: 'Quit App',
      accelerator: 'CmdOrCtrl+Q',
      click() {
        ipc.send('quit-app');
      },
    },
  ]
};

const invoiceMenu = {
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
        mainWindow.webContents.send('menu-form-save');
      },
    },
    {
      label: 'Reset',
      accelerator: 'CmdOrCtrl+R',
      click() {
        mainWindow.webContents.send('menu-form-clear');
      },
    },
    { type: 'separator' },
    {
      label: 'Add Item',
      accelerator: 'CmdOrCtrl+I',
      click() {
        mainWindow.webContents.send('menu-form-add-item');
      },
    },
    { type: 'separator' },
    {
      label: 'Toggle',
      submenu: [
        {
          label: 'Toggle Form Settings',
          accelerator: 'Alt+S',
          click() {
            mainWindow.webContents.send('menu-form-toggle-settings');
          },
        },
        {
          label: 'Toggle Due Date',
          accelerator: 'Alt+T',
          click() {
            mainWindow.webContents.send('menu-form-toggle-dueDate');
          },
        },
        {
          label: 'Toggle Currency',
          accelerator: 'Alt+C',
          click() {
            mainWindow.webContents.send('menu-form-toggle-currency');
          },
        },
        {
          label: 'Toggle VAT',
          accelerator: 'Alt+V',
          click() {
            mainWindow.webContents.send('menu-form-toggle-vat');
          },
        },
        {
          label: 'Toggle Discount',
          accelerator: 'Alt+D',
          click() {
            mainWindow.webContents.send('menu-form-toggle-discount');
          },
        },
        {
          label: 'Toggle Note',
          accelerator: 'Alt+N',
          click() {
            mainWindow.webContents.send('menu-form-toggle-note');
          },
        },
      ],
    }
  ],
};

const goMenu = {
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
};

const editMenu = {
  label: 'Edit',
  submenu: [
    { role: 'undo' },
    { role: 'redo' },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'pasteandmatchstyle' },
    { role: 'deconste' },
    { role: 'selectall' },
  ],
};

const viewMenu = {
  label: 'View',
  submenu: [
    { role: 'forcereload' },
    { role: 'toggledevtools' },
    { type: 'separator' },
    { role: 'togglefullscreen' },
  ],
};

const windowsMenu = {
  role: 'window',
  submenu: [{ role: 'minimize' }, { role: 'close' }],
};

const helpMenu = {
  role: 'help',
  submenu: [
    {
      label: 'Show Tutorial',
      accelerator: 'CmdOrCtrl+T',
      click() {
        ipc.send('start-tour');
      },
    },
    {
      label: 'Learn More',
      click() {
        require('electron').shell.openExternal('https://manta.life');
      },
    },
  ],
};

// Add additional menu item on Windows & Linux
if (process.platform !== 'darwin') {
  // Add Quit to invoiceMenu
  invoiceMenu.submenu.push(
    { type: 'separator' },
    {
      label: 'Quit App',
      accelerator: 'CmdOrCtrl+Q',
      click() {
        ipc.send('quit-app');
      },
    },
  );
  // Add check for update to helpMenu
  helpMenu.submenu.unshift({
    label: 'Check For Updates',
    accelerator: 'CmdOrCtrl+U',
    click() {
      ipc.send('check-for-updates');
    },
  });
}
// Base menu
const menuTemplate = [
  invoiceMenu,
  goMenu,
  editMenu,
  windowsMenu,
  helpMenu,
];
// Add About menu on Mac
if (process.platform === 'darwin') {
  menuTemplate.unshift(aboutMenu);
}
// Developer Tools Menu
if (isDev) menuTemplate.splice(3, 0, viewMenu);
// Build the menu
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
