// Libs
import { BrowserWindow, ipcMain, shell } from 'electron'
import appConfig from 'electron-settings'
import path from 'path'
import fs from 'fs'

ipcMain.on('save-pdf', async (event, docId) => {
  try {
    const exportDir = appConfig.getSync('invoice.exportDir') || './'
    const pdfPath = path.join(exportDir, `${docId}.pdf`)
    const win = BrowserWindow.fromWebContents(event.sender)

    let printOptions = appConfig.getSync('general.printOptions') || {
      landscape: false,
      marginsType: 0,
      printBackground: true,
      printSelectionOnly: false,
    }

    const data = await win.webContents.printToPDF(printOptions)

    fs.promises
      .writeFile(pdfPath, data)
      .then(() => {
        if (appConfig.getSync('general.previewPDF')) {
          // Open the PDF with default Reader
          shell.openExternal('file://' + pdfPath)
        }
        // Show notification
        win.webContents.send('pdf-exported', {
          title: 'PDF Exported',
          body: 'Click to reveal file.',
          location: pdfPath,
        })
      })
      .catch((error) => {
        console.error('Error writing PDF file:', error)
        throw error
      })
  } catch (error) {
    console.error('Error exporting PDF:', error)
    event.sender.send('pdf-export-error', {
      title: 'PDF Export Failed',
      body: 'An error occurred while exporting the PDF.',
    })
  }
})

ipcMain.on('reveal-file', (event, location) => {
  try {
    shell.showItemInFolder(location)
  } catch (error) {
    console.error('Error revealing file:', error)
    event.sender.send('file-reveal-error', {
      title: 'Reveal File Failed',
      body: 'An error occurred while revealing the file.',
    })
  }
})
