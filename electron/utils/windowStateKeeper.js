import appConfig from 'electron-settings'

export function windowStateKeeper(windowName) {
  let window, windowState

  function setBounds() {
    // Restore from appConfig
    if (appConfig.has(`windowState.${windowName}`)) {
      windowState = appConfig.get(`windowState.${windowName}`)
      return
    }
    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: 1000,
      height: 800,
    }
  }

  function saveState() {
    if (!windowState.isMaximized) {
      windowState = window.getBounds()
    }
    windowState.isMaximized = window.isMaximized()
    appConfig.set(`windowState.${windowName}`, windowState)
  }

  function track(win) {
    window = win
    ;['resize', 'move'].forEach((event) => {
      win.on(event, saveState)
    })
  }

  setBounds()

  return {
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  }
}
