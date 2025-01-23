import { BrowserWindow, ipcMain } from 'electron'
import appConfig from 'electron-settings'

let tourWindow, mainWindow, previewWindow

// Initialize windows
function initializeWindows() {
  const tourWindowID = appConfig.getSync('tourWindowID')
  const mainWindowID = appConfig.getSync('mainWindowID')
  const previewWindowID = appConfig.getSync('previewWindowID')

  if (tourWindowID) {
    tourWindow = BrowserWindow.fromId(tourWindowID)
  }
  if (mainWindowID) {
    mainWindow = BrowserWindow.fromId(mainWindowID)
  }
  if (previewWindowID) {
    previewWindow = BrowserWindow.fromId(previewWindowID)
  }
}

// Call initializeWindows when loading this module
initializeWindows()

// Event handlers
ipcMain.on('start-tour', startTour)
ipcMain.on('end-tour', endTour)

function startTour() {
  console.log('startTour')
  if (!tourWindow) return
  saveWinsVisibleState()
  hideAllWindows()
  tourWindow.show()
  tourWindow.focus()
  appConfig.setSync('tour.isActive', true)
}

function endTour() {
  console.log('endTour')
  if (!tourWindow) return
  appConfig.setSync('tour', {
    hasBeenTaken: true,
    isActive: false,
  })
  tourWindow.hide()
  restoreWindows()
  saveWinsVisibleState()
}

function saveWinsVisibleState() {
  appConfig.setSync('winsLastVisibleState', {
    isMainWinVisible: mainWindow?.isVisible() || false,
    isPreviewWinVisible: previewWindow?.isVisible() || false,
  })
}

function restoreWindows() {
  const { isMainWinVisible, isPreviewWinVisible } = appConfig.getSync(
    'winsLastVisibleState'
  )
  if (isMainWinVisible) mainWindow?.show()
  if (isPreviewWinVisible) previewWindow?.show()
}

function hideAllWindows() {
  mainWindow?.hide()
  previewWindow?.hide()
}

export function showWindow(context) {
  console.log('showWindow', context)
  const tour = appConfig.getSync('tour')
  console.log('tour', tour)
  console.log('showWindow', context)
  if (tour.isActive) {
    if (context === 'startup') {
      tourWindow?.once('ready-to-show', () => {
        tourWindow.show()
        tourWindow.focus()
      })
    } else if (context === 'activate') {
      tourWindow?.show()
      tourWindow?.focus()
    }
  } else if (tour.hasBeenTaken) {
    if (context === 'startup') {
      mainWindow?.once('ready-to-show', () => {
        mainWindow.show()
        mainWindow.focus()
      })
    } else if (context === 'activate') {
      restoreWindows()
    }
  } else {
    startTour()
  }
}
