import appConfig from 'electron-settings'
import path from 'path'
import { BrowserWindow, app } from 'electron'
import { centerOnPrimaryDisplay } from '../helpers/center-on-primary-display.js'
import { fileURLToPath } from 'url'
import { waitForViteServer } from '../helpers/waitForVite.js'
import { windowStateKeeper } from './windowStateKeeper.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isDev = process.env.NODE_ENV === 'development'

const paths = {
  tour: 'tour.html',
  main: '../app/index.html',
  preview: 'preview/index.html',
}

const getDevURL = (url) => `http://localhost:5173/${url}`
const getProdURL = (url) => `file://${path.join(__dirname, `prod/${url}`)}`

const loadWindowContent = async (window, devPath, prodPath) => {
  const devURL = getDevURL(devPath)
  const prodURL = getProdURL(prodPath)

  try {
    if (isDev) {
      await waitForViteServer(devURL) // Wait for Vite server in development
      await window.loadURL(devURL) // Load development build
    } else {
      await window.loadURL(prodURL) // Load production build
    }
  } catch (error) {
    console.error(`Error loading URL for ${devPath}:`, error)
  }
}

const configureWindowEvents = (window, config) => {
  const { hideOnClose, openDevToolsOnShow } = config

  if (openDevToolsOnShow) {
    window.on('show', () => {
      console.log(`${window.getTitle()} is shown`)
      window.webContents.openDevTools({ mode: 'detach' })
    })
  }

  window.on('close', (event) => {
    if (hideOnClose) {
      event.preventDefault()
      window.hide()
    } else if (process.platform === 'darwin') {
      event.preventDefault()
      window.hide()
    } else {
      app.quit()
    }
  })
}

export const createTourWindow = async () => {
  const width = 700
  const height = 600
  const winPOS = centerOnPrimaryDisplay(width, height)

  const preloadPath = path.join(__dirname, './preload.js')
  console.log('Preload path:', preloadPath)

  const tourWindow = new BrowserWindow({
    x: winPOS.x,
    y: winPOS.y,
    width,
    height,
    show: false,
    frame: false,
    resizable: false,
    movable: false,
    title: 'Tour Window',
    backgroundColor: '#F9FAFA',
    webPreferences: {
      preload: preloadPath,
      //contextIsolation: true,
      //nodeIntegration: false,
    },
  })

  appConfig.set('tourWindowID', parseInt(tourWindow.id))

  await loadWindowContent(tourWindow, paths.tour, paths.tour)
  configureWindowEvents(tourWindow, {
    hideOnClose: true,
    openDevToolsOnShow: isDev,
  })

  return tourWindow
}

export const createPreviewWindow = async () => {
  const previewState = windowStateKeeper('preview')

  const previewWindow = new BrowserWindow({
    x: previewState.x,
    y: previewState.y,
    width: previewState.width,
    height: previewState.height,
    minWidth: 1024,
    minHeight: 800,
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Preview Window',
  })

  appConfig.set('previewWindowID', parseInt(previewWindow.id))
  previewState.track(previewWindow)

  await loadWindowContent(previewWindow, paths.preview, paths.preview)
  configureWindowEvents(previewWindow, {
    hideOnClose: true,
    openDevToolsOnShow: isDev,
  })

  return previewWindow
}

export const createMainWindow = async () => {
  const mainState = windowStateKeeper('main')

  const mainWindow = new BrowserWindow({
    x: mainState.x,
    y: mainState.y,
    width: mainState.width,
    height: mainState.height,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#2e2c29',
    show: false,
    title: 'Main Window',
  })

  appConfig.set('mainWindowID', parseInt(mainWindow.id))
  mainState.track(mainWindow)

  await loadWindowContent(mainWindow, paths.main, paths.main)
  configureWindowEvents(mainWindow, {
    hideOnClose: process.platform === 'darwin',
    openDevToolsOnShow: isDev,
  })

  return mainWindow
}
