import { app } from 'electron'
import { initializeApp } from './electron/utils/initialize.js'

function start() {
  let previewWindow = null
  let tourWindow = null
  let mainWindow = null

  app.on('ready', () => {
    const windows = initializeApp()
    tourWindow = windows.tourWindow
    mainWindow = windows.mainWindow
    previewWindow = windows.previewWindow
  })

  app.on('activate', async () => {
    try {
      const { showWindow } = await import('./main/tour.js')
      showWindow('activate')
    } catch (error) {
      console.error('Error during app activation:', error)
    }
  })

  // Clean up before quitting
  app.on('before-quit', () => {
    try {
      if (tourWindow) tourWindow.destroy()
      if (mainWindow) mainWindow.destroy()
      if (previewWindow) previewWindow.destroy()
    } catch (error) {
      console.error('Error during app cleanup:', error)
    }
  })
}

start()
