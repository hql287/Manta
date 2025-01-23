import { ipcMain, app } from 'electron';
import autoUpdater from 'electron-updater';

export function addEventListeners(tourWindow, mainWindow, previewWindow) {
  ipcMain.on('quit-app', () => {
    app.quit();
  });

  ipcMain.on('quit-and-install', () => {
    setImmediate(() => {
      app.removeAllListeners('window-all-closed');
      tourWindow.destroy();
      mainWindow.destroy();
      previewWindow.destroy();
      autoUpdater.quitAndInstall(false);
    });
  });
}
