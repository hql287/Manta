import { BrowserWindow } from 'electron'

export function addDevToolsExtension() {
  if (process.env.DEVTRON_DEV_TOOLS_PATH)
    BrowserWindow.addDevToolsExtension(process.env.DEVTRON_DEV_TOOLS_PATH)
  if (process.env.REACT_DEV_TOOLS_PATH)
    BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOLS_PATH)
  if (process.env.REDUX_DEV_TOOLS_PATH)
    BrowserWindow.addDevToolsExtension(process.env.REDUX_DEV_TOOLS_PATH)
}
