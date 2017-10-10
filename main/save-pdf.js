// Libs
const {BrowserWindow, ipcMain, shell} = require('electron');
const appConfig = require('electron-settings');
const path = require('path');
const fs = require('fs');

ipcMain.on('save-pdf', (event, docId) => {
  const exportDir = appConfig.get('appSettings.exportDir');
  const pdfPath = path.join(exportDir, `${docId}.pdf`);
  const win = BrowserWindow.fromWebContents(event.sender);

  let printOptions;
  if (appConfig.has('appSettings.printOptions')) {
    printOptions = appConfig.get('appSettings.printOptions');
  } else {
    printOptions = {
      landscape: false,
      marginsType: 0,
      printBackground: true,
      printSelectionOnly: false,
    };
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
