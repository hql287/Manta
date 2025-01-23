import { ipcMain, dialog } from 'electron';

ipcMain.on('open-file-dialog', async (event) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'svg'] }],
  });

  if (!canceled && filePaths.length > 0) {
    event.sender.send('file-selected', filePaths[0]);
  }
});
