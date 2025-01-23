import { ipcMain, app } from 'electron'
import autoUpdater from 'electron-updater'
import { createDialogWindow } from '../windows/dialog.js'

export function addEventListeners(tourWindow, mainWindow, previewWindow) {
  ipcMain.handle(
    'create-dialog-window',
    async (event, dialogOptions, returnChannel, ...rest) => {
      return await createDialogWindow(dialogOptions, returnChannel, ...rest)
    }
  )

  ipcMain.on('quit-app', () => {
    app.quit()
  })

  ipcMain.on('quit-and-install', () => {
    setImmediate(() => {
      app.removeAllListeners('window-all-closed')
      tourWindow.destroy()
      mainWindow.destroy()
      previewWindow.destroy()
      autoUpdater.quitAndInstall(false)
    })
  })
}
