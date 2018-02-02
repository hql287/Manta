// Node Libs
const path = require('path');
const url = require('url');

// Electron Libs
const { BrowserWindow } = require('electron').remote;

// Custom Libs
const sounds = require('../../libs/sounds.js');

const centerOnPrimaryDisplay = require('../../helpers/center-on-primary-display');

function showModalWindow(dialogOptions, returnChannel = '', ...rest) {
  const width = 450;
  const height = 220;

  // Get X and Y coordinations on primary display
  const winPOS = centerOnPrimaryDisplay(width, height);

  let modalWin = new BrowserWindow({
    x: winPOS.x,
    y: winPOS.y,
    width,
    height,
    backgroundColor: '#282828',
    frame: false,
    show: false,
  });
  modalWin.loadURL(
    url.format({
      pathname: path.resolve(__dirname, '../modal/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  modalWin.on('close', () => (modalWin = null));
  modalWin.webContents.on('did-finish-load', () => {
    modalWin.webContents.send(
      'update-modal',
      dialogOptions,
      returnChannel,
      ...rest
    );
  });
  modalWin.on('ready-to-show', () => {
    modalWin.show();
    modalWin.focus();
    sounds.play('DIALOG');
  });
}

module.exports = showModalWindow;
