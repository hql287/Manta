// Node Libs
const fs = require('fs');
const nodePath = require('path');

// Electron Libs
const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;
const BrowserWindow = require('electron').BrowserWindow;

// 3rd Party Libs
const appConfig = require('electron-settings');

ipc.on('select-export-directory', event => {
  const window = BrowserWindow.fromWebContents(event.sender);
  dialog.showOpenDialog(window, { properties: ['openDirectory'] }, path => {
    if (path) {
      fs.access(path[0], fs.constants.W_OK, err => {
        if (err) {
          event.sender.send('no-access-directory', err.message);
        } else {
          appConfig.set('exportDir', path[0]);
          event.sender.send('confirmed-export-directory', path[0]);
        }
      });
    }
  });
});

ipc.on('select-export-path', event => {
  const window = BrowserWindow.fromWebContents(event.sender);
  dialog.showSaveDialog(
    window,
    { filters: [{ name: 'CSV', extensions: ['csv'] }] },
    path => {
      if (path) {
        // Get the directory to check whether
        // you have write permission or not
        const dir = nodePath.parse(path).dir;

        fs.access(dir, fs.constants.W_OK, err => {
          if (err) {
            event.sender.send('no-access-directory', err.message);
          } else {
            appConfig.set('exportPath', path);
            event.sender.send('confirmed-export-path', path);
          }
        });
      }
    }
  );
});

ipc.on('select-import-path', event => {
  const window = BrowserWindow.fromWebContents(event.sender);
  dialog.showOpenDialog(
    window,
    {
      filters: [{ name: 'CSV', extensions: ['csv'] }],
      properties: ['openFile'],
    },
    path => {
      if (path) {
        fs.access(path[0], fs.constants.R_OK, err => {
          if (err) {
            event.sender.send('no-access-directory', err.message);
          } else {
            appConfig.set('importPath', path[0]);
            event.sender.send('confirmed-import-path', path[0]);
          }
        });
      }
    }
  );
});
