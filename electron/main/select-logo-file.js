import { ipcMain, dialog } from 'electron'
import fs from 'fs'

//ipcMain.on('open-file-dialog', async (event) => {
//const { canceled, filePaths } = await dialog.showOpenDialog({
//properties: ['openFile'],
//filters: [{ name: 'Images', extensions: ['jpg', 'png', 'svg'] }],
//})

//if (!canceled && filePaths.length > 0) {
//event.sender.send('file-selected', filePaths[0])
//}
//})

//ipcMain.handle('open-file-dialog', async (event) => {
//const { canceled, filePaths } = await dialog.showOpenDialog({
//properties: ['openFile'],
//filters: [{ name: 'Images', extensions: ['jpg', 'png', 'svg'] }],
//})

//if (!canceled && filePaths.length > 0) {
//event.sender.send('file-selected', filePaths[0])
//}

//if (filePaths.length > 0) {
//const fileBuffer = fs.readFileSync(filePaths[0])
//const base64String = `data:image/${filePaths[0].endsWith('svg') ? 'svg+xml' : 'jpeg'};base64,${fileBuffer.toString('base64')}`
//return base64String
//}
//return null
//})
