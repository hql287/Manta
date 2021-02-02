// Libs
const { BrowserWindow, ipcMain, shell } = require('electron');
const appConfig = require('electron-settings');
const path = require('path');
const fs = require('fs');

ipcMain.on('save-pdf', (event, docId) => {
  const exportDir = appConfig.getSync('invoice.exportDir');
  const pdfPath = path.join(exportDir, `${docId}.pdf`);
  const win = BrowserWindow.fromWebContents(event.sender);

  let printOptions;
  if (appConfig.hasSync('general.printOptions')) {
    printOptions = appConfig.getSync('general.printOptions');
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
      if (appConfig.getSync('general.previewPDF')) {
        // Open the PDF with default Reader
        shell.openExternal('file://' + pdfPath);
      }
      // Show notification
      win.webContents.send('pfd-exported', {
        title: 'PDF Exported',
        body: 'Click to reveal file.',
        location: pdfPath,
      });
    });
  });
});

ipcMain.on('reveal-file', (event, location) => {
  shell.showItemInFolder(location);
});
