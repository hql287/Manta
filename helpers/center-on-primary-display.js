const {remote} = require('electron');

const centerOnPrimaryDisplay = (winWidth, winHeight) => {
    const isRemoteReady = remote && remote.app;
    // on startup, remote is not available. Will be availble during runtime
    if (!isRemoteReady) {
        return {
            x: 0,
            y: 0
        }
    }
  return remote.app.whenReady().then(() => {
    // Get primary display (screen / monitor) bounds
    const primaryDisplay = remote.screen.getPrimaryDisplay();
    const { x, y, width, height } = primaryDisplay.bounds;

    // Calculate X and Y coordinates to make rectangular center on primary display
    const winX = x + (width - winWidth) / 2;
    const winY = y + (height - winHeight) / 2;

    return {
      x: winX,
      y: winY,
    };
  });
};

module.exports = centerOnPrimaryDisplay;
