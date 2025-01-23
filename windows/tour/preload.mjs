import {contextBridge } from 'electron';


contextBridge.exposeInMainWorld('electronAPI', {
  isDev: true,
});
