const path = require('path');
const VOLUME = 0.5;

module.exports = {
  STARTUP: {
    url: path.resolve(__dirname, './startup.wav'),
    volume: VOLUME * 2
  },

  DIALOG: {
    url: path.resolve(__dirname, './dialog.wav'),
    volume: VOLUME
  },

  SUCCESS: {
    url: path.resolve(__dirname, './success.wav'),
    volume: VOLUME
  },

  WARNING: {
    url: path.resolve(__dirname, './warning.wav'),
    volume: VOLUME
  },

  ADD: {
    url: path.resolve(__dirname, './add.wav'),
    volume: VOLUME
  },

  REMOVE: {
    url: path.resolve(__dirname, './remove.wav'),
    volume: VOLUME
  },

  RELOAD: {
    url: path.resolve(__dirname, './reload.wav'),
    volume: VOLUME
  },

  TAP: {
    url: path.resolve(__dirname, './tap.wav'),
    volume: VOLUME
  },
};
