const {app, screen} = require('electron');

const centerOnPrimaryDisplay = (winWidth, winHeight) => {
  return app.whenReady().then(() => {
      console.log(screen);
    // Get primary display (screen / monitor) bounds
    const primaryDisplay = screen.getPrimaryDisplay();
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
