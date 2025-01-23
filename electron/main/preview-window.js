import { BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import appConfig from 'electron-settings'

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const getWindowUrl = (windowName) => {
  return isDev
    ? `http://localhost:5173/${windowName}`
    : `file://${path.join(__dirname, `../dist/${windowName}.html`)}`
}

let previewWindow = null

export function createPreviewWindow() {
  if (!previewWindow) {
    previewWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
      },
    })

    previewWindow.loadURL(getWindowUrl('preview'))
    appConfig.set('previewWindowID', previewWindow.id)

    previewWindow.on('closed', () => {
      previewWindow = null
      appConfig.delete('previewWindowID')
    })
  }
  return previewWindow
}

function getMainWindow() {
  const mainWindowID = appConfig.get('mainWindowID')
  return BrowserWindow.fromId(mainWindowID)
}

// IPC Events
ipcMain.on('preview-invoice', (event, invoiceData) => {
  const previewWindow = createPreviewWindow()
  previewWindow.show()
  previewWindow.focus()
  previewWindow.webContents.send('update-preview', invoiceData)
})

ipcMain.on('update-preview-window', (event, newConfigs) => {
  if (previewWindow) {
    previewWindow.webContents.send('update-preview-window', newConfigs)
  }
})

ipcMain.on('change-preview-window-language', (event, newLang) => {
  if (previewWindow) {
    previewWindow.webContents.send('change-preview-window-language', newLang)
  }
})

ipcMain.on('change-preview-window-profile', (event, newProfile) => {
  if (previewWindow) {
    previewWindow.webContents.send('change-preview-window-profile', newProfile)
  }
})

ipcMain.on('save-configs-to-invoice', (event, invoiceID, configs) => {
  const mainWindow = getMainWindow()
  if (mainWindow) {
    mainWindow.webContents.send('save-configs-to-invoice', invoiceID, configs)
  }
})
