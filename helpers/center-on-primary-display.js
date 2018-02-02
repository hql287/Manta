const electron = require('electron');

const centerOnPrimaryDisplay = (winWidth, winHeight) => {
  // Get primary display (screen / monitor) bounds
  const primaryDisplay = electron.screen.getPrimaryDisplay();
  const { x, y, width, height } = primaryDisplay.bounds;

  // Calculate X and Y coordinates to make rectangular center on primary display
  const winX = x + (width - winWidth) / 2;
  const winY = y + (height - winHeight) / 2;

  return {
    x: winX,
    y: winY,
  };
};

module.exports = centerOnPrimaryDisplay;
