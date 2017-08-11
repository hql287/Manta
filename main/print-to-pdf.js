// Node Libs
const fs = require('fs');

// Electron Libs
const path = require('path');
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const shell = electron.shell;

// 3rd Party Libs
const appConfig = require('electron-settings');

ipc.on('print-to-pdf', (event, docId) => {
  const exportDir = appConfig.get('printOptions.exportDir');
  const pdfPath = path.join(exportDir, `${docId}.pdf`);
  const win = BrowserWindow.fromWebContents(event.sender);

  let printOptions;
  if (appConfig.has('printOptions')) {
    printOptions = appConfig.get('printOptions');
  } else {
    printOptions = {};
  }
  win.webContents.printToPDF(printOptions, (error, data) => {
    if (error) throw error;
    fs.writeFile(pdfPath, data, error => {
      if (error) {
        throw error;
      }
      shell.openExternal('file://' + pdfPath);
      event.sender.send('wrote-pdf', pdfPath);
    });
  });
});
