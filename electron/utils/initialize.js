import { createTourWindow } from '../windows/tourWindow.js'
import { createMainWindow } from '../windows/mainWindow.js'
import { createPreviewWindow } from '../windows/previewWindow.js'
import { setInitialValues } from './configs.js'
import { migrateData } from './migration.js'
import { addEventListeners } from './ipcListeners.js'
import { loadMainProcessFiles } from './mainProcessFiles.js'
import { addDevToolsExtension } from './devTools.js'

import appConfig from 'electron-settings'

export async function initializeApp() {
  const isDev = process.env.NODE_ENV === 'development'

  const tourWindow = await createTourWindow()
  const mainWindow = await createMainWindow()
  const previewWindow = null
  //const previewWindow = createPreviewWindow()

  setInitialValues()
  migrateData()

  if (isDev) addDevToolsExtension()

  addEventListeners(tourWindow, mainWindow, previewWindow)
  loadMainProcessFiles()

  try {
    const { showWindow } = await import('../main/tour.js')
    showWindow('startup')
  } catch (error) {
    console.error('Error during app activation:', error)
  }

  return {
    tourWindow,
    mainWindow,
    previewWindow,
  }
}
