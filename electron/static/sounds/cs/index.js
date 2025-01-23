import path from 'path'
const VOLUME = 0.25

import { fileURLToPath } from 'url'

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  STARTUP: {
    url: path.resolve(__dirname, '../static/sounds/cs/startup.wav'),
    volume: VOLUME * 2,
  },

  DIALOG: {
    url: path.resolve(__dirname, '../static/sounds/cs/dialog.wav'),
    volume: VOLUME,
  },

  SUCCESS: {
    url: path.resolve(__dirname, '../static/sounds/cs/success.wav'),
    volume: VOLUME,
  },

  WARNING: {
    url: path.resolve(__dirname, '../static/sounds/cs/warning.wav'),
    volume: VOLUME,
  },

  ADD: {
    url: path.resolve(__dirname, '../static/sounds/cs/add.wav'),
    volume: VOLUME,
  },

  REMOVE: {
    url: path.resolve(__dirname, '../static/sounds/cs/remove.wav'),
    volume: VOLUME,
  },

  RELOAD: {
    url: path.resolve(__dirname, '../static/sounds/cs/reload.wav'),
    volume: VOLUME,
  },

  TAP: {
    url: path.resolve(__dirname, '../static/sounds/cs/tap.wav'),
    volume: VOLUME,
  },
}
