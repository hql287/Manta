import appConfig from 'electron-settings'
import isDev from 'electron-is-dev'
import path from 'path'
import url, { fileURLToPath } from 'url'
import { BrowserWindow } from 'electron'
import { waitForViteServer } from '../utils/waitForVite.js'
import { windowStateKeeper } from '../utils/windowStateKeeper.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { ipcMain, dialog } from 'electron'
import fs from 'fs'

//const isDev = process.env.NODE_ENV === 'development'
const devURL = 'http://localhost:5173/src/windows/main/index.html'
const prodURL = `file://${path.join(__dirname, './dist/main.html')}`
let mainWindow

export const createMainWindow = async () => {
  // Get window state
  const mainWindownStateKeeper = windowStateKeeper('main')
  // Creating a new window
  mainWindow = new BrowserWindow({
    x: mainWindownStateKeeper.x,
    y: mainWindownStateKeeper.y,
    width: mainWindownStateKeeper.width,
    height: mainWindownStateKeeper.height,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Main Window',
    webPreferences: {
      preload: path.join(__dirname, '../preloads.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })
  // Register WindowID
  appConfig.set('mainWindowID', parseInt(mainWindow.id))
  // Track window state
  mainWindownStateKeeper.track(mainWindow)

  // Load Content
  try {
    if (isDev) {
      await waitForViteServer(devURL) // Wait for Vite server in development
      mainWindow.loadURL(devURL)
    } else {
      mainWindow.loadURL(prodURL) // Load production build
    }
  } catch (error) {
    console.error('Error loading URL:', error)
  }

  // Add Event Listeners
  mainWindow.on('show', (event) => {
    if (isDev || forceDevtools)
      mainWindow.webContents.openDevTools({ mode: 'detach' })
  })
  mainWindow.on('close', (event) => {
    if (process.platform === 'darwin') {
      event.preventDefault()
      if (isDev || forceDevtools) mainWindow.webContents.closeDevTools()
      mainWindow.hide()
    } else {
      app.quit()
    }
  })

  ipcMain.handle('open-file-dialog', async (event) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'svg'] }],
    })

    if (!canceled && filePaths.length > 0) {
      event.sender.send('file-selected', filePaths[0])
    }

    if (filePaths.length > 0) {
      const fileBuffer = fs.readFileSync(filePaths[0])
      const base64String = `data:image/${filePaths[0].endsWith('svg') ? 'svg+xml' : 'jpeg'};base64,${fileBuffer.toString('base64')}`
      return base64String
    }
    return null
  })

  return mainWindow
}
