const path = require('path');
const VOLUME = 0.25;

module.exports = {

  STARTUP: {
    url: path.join('file://', __dirname, './startup.wav'),
    volume: VOLUME * 2
  },

  ADD: {
    url: path.join('file://', __dirname, './add.wav'),
    volume: VOLUME
  },

  REMOVE: {
    url: path.join('file://', __dirname, './remove.wav'),
    volume: VOLUME
  },

  DIALOG: {
    url: path.join('file://', __dirname, './dialog.wav'),
    volume: VOLUME
  },

  COMPLETE: {
    url: path.join('file://', __dirname, './complete.wav'),
    volume: VOLUME
  },

  RELOAD: {
    url: path.join('file://', __dirname, './reload.wav'),
    volume: VOLUME
  },

  TRASH: {
    url: path.join('file://', __dirname, './trash.wav'),
    volume: VOLUME
  },

  TAP: {
    url: path.join('file://', __dirname, './tap.wav'),
    volume: VOLUME
  },
};


