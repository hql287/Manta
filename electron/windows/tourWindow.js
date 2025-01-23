import appConfig from 'electron-settings'
import path from 'path'
import { fileURLToPath } from 'url'
import { BrowserWindow } from 'electron'
import { centerOnPrimaryDisplay } from '../utils/centerOnPrimaryDisplay.js'
import { waitForViteServer } from '../utils/waitForVite.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isDev = process.env.NODE_ENV === 'development'
const devURL = 'http://localhost:5173/src/windows/tour/index.html'
const prodURL = `file://${path.join(__dirname, './dist/tour.html')}`

let tourWindow = null

export const createTourWindow = async () => {
  const width = 700
  const height = 600
  const winPOS = centerOnPrimaryDisplay(width, height)

  tourWindow = new BrowserWindow({
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
      preload: path.join(__dirname, '../preloads.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })

  appConfig.set('tourWindowID', parseInt(tourWindow.id))

  // Load Content
  try {
    if (isDev) {
      await waitForViteServer(devURL) // Wait for Vite server in development
      tourWindow.loadURL(devURL)
    } else {
      tourWindow.loadURL(prodURL) // Load production build
    }
  } catch (error) {
    console.error('Error loading URL:', error)
  }

  tourWindow.on('show', () => {
    if (isDev) {
      console.log('tour window is shown')

      console.log('Loading URL:', isDev ? devURL : prodURL)
      tourWindow.webContents.openDevTools({ mode: 'detach' })
    }
  })

  tourWindow.on('close', (event) => {
    event.preventDefault()
    tourWindow.hide()
  })

  return tourWindow
}
