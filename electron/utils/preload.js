import { contextBridge, ipcRenderer } from 'electron'

console.log('preload.js loaded')

contextBridge.exposeInMainWorld('electronAPI', {
  endTour: () => {
    ipcRenderer.send('endTour')
  },
})
