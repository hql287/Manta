import isDev from 'electron-is-dev'
import path from 'path'
import url, { fileURLToPath } from 'url'
import { BrowserWindow } from 'electron'
import { play } from '../utils/sounds.js'
import { centerOnPrimaryDisplay } from '../utils/centerOnPrimaryDisplay.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const devURL = 'http://localhost:5173/windows/dialog/index.html'
const prodURL = `file://${path.join(__dirname, './dist/dialog.html')}`
let dialogWindow

export const createDialogWindow = async (
  dialogOptions,
  returnChannel = '',
  ...rest
) => {
  const width = 450
  const height = 220

  // Get X and Y coordinations on primary display
  const winPOS = centerOnPrimaryDisplay(width, height)

  dialogWindow = new BrowserWindow({
    x: winPOS.x,
    y: winPOS.y,
    width,
    height,
    backgroundColor: '#282828',
    frame: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preloads.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })

  try {
    if (isDev) {
      await waitForViteServer(devURL) // Wait for Vite server in development
      dialogWindow.loadURL(devURL)
    } else {
      dialogWindow.loadURL(prodURL) // Load production build
    }
  } catch (error) {
    console.error('Error loading URL:', error)
  }

  dialogWindow.webContents.on('did-finish-load', () => {
    dialogWindow.webContents.send(
      'update-modal',
      dialogOptions,
      returnChannel,
      ...rest
    )
  })

  dialogWindow.on('ready-to-show', () => {
    dialogWindow.show()
    dialogWindow.focus()
    sounds.play('DIALOG')
  })

  dialogWindow.on('close', () => (dialogWindow = null))

  return dialogWindow
}
