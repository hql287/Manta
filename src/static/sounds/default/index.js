const path = require('path');
const VOLUME = 0.5;

module.exports = {
  STARTUP: {
    url: path.resolve(__dirname, '../static/sounds/default/startup.wav'),
    volume: VOLUME * 2,
  },

  DIALOG: {
    url: path.resolve(__dirname, '../static/sounds/default/dialog.wav'),
    volume: VOLUME,
  },

  SUCCESS: {
    url: path.resolve(__dirname, '../static/sounds/default/success.wav'),
    volume: VOLUME,
  },

  WARNING: {
    url: path.resolve(__dirname, '../static/sounds/default/warning.wav'),
    volume: VOLUME,
  },

  ADD: {
    url: path.resolve(__dirname, '../static/sounds/default/add.wav'),
    volume: VOLUME,
  },

  REMOVE: {
    url: path.resolve(__dirname, '../static/sounds/default/remove.wav'),
    volume: VOLUME,
  },

  RELOAD: {
    url: path.resolve(__dirname, '../static/sounds/default/reload.wav'),
    volume: VOLUME,
  },

  TAP: {
    url: path.resolve(__dirname, '../static/sounds/default/tap.wav'),
    volume: VOLUME,
  },
};
