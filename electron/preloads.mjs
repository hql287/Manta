import { contextBridge, ipcRenderer } from 'electron'
import fs from 'fs'

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
    removeListener: (channel, listener) =>
      ipcRenderer.removeListener(channel, listener),
    send: (channel, data) => ipcRenderer.send(channel, data),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
  },
  endTour: () => {
    ipcRenderer.send('end-tour')
  },
  createDialogWindow: (dialogOptions, returnChannel, ...rest) => {
    return ipcRenderer.invoke('create-dialog-window', dialogOptions, returnChannel, ...rest);
  },
  readFileSync: (filePath) => fs.readFileSync(filePath),
});
