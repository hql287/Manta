import fs from 'fs'
import { ipcMain, dialog, BrowserWindow } from 'electron'
import appConfig from 'electron-settings'

ipcMain.on('select-export-directory', async (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  const { canceled, filePaths } = await dialog.showOpenDialog(window, {
    properties: ['openDirectory'],
  })

  if (!canceled && filePaths.length > 0) {
    const dirPath = filePaths[0]
    fs.access(dirPath, fs.constants.W_OK, (err) => {
      if (err) {
        event.sender.send('no-access-directory', err.message)
      } else {
        appConfig.set('exportDir', dirPath)
        event.sender.send('confirmed-export-directory', dirPath)
      }
    })
  }
})
