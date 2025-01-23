export {}

declare global {
  interface Window {
    electronAPI: {
      ipcRenderer: {
        removeAllListeners: (channels: string[]) => void
        removeListener: (
          channel: string,
          listener: (...args: any[]) => void
        ) => void
        send: (channel: string, data: any) => void
        on: (channel: string, func: (...args: any[]) => void) => void
        invoke: <T = any>(channel: string, ...args: any[]) => Promise<T>
      }
      endTour: () => void
      createDialogWindow: (
        dialogOptions: any,
        returnChannel: string,
        ...rest: any[]
      ) => Promise<any>
      readFileSync: (filePath: string) => Buffer
    }
  }
}
