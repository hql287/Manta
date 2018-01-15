const electron = require('electron');

const centerOnPrimaryDisplay = (width, height) => {
  // Get Primary Display (screen / monitor)
  const primaryDisplay = electron.screen.getPrimaryDisplay();

  // TODO: how to do error handling in electron?
  if (!width || !height) {
    throw new Error('missing width and / or height!');
  }

  // X and Y coordinates to make rectangular center of primary display
  const x = primaryDisplay.bounds.width / 2 - width / 2 + primaryDisplay.bounds.x;
  const y = primaryDisplay.bounds.height / 2 - height / 2 + primaryDisplay.bounds.y;

  return { x, y };
};

module.exports = centerOnPrimaryDisplay;
