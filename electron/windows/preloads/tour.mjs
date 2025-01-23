import { contextBridge, ipcRenderer } from 'electron'

console.log('Preload script loaded')
contextBridge.exposeInMainWorld('electronAPI', {
  endTour: () => {
    ipcRenderer.send('endTour')
  },
})
