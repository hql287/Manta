const electron = require('electron');

const centerOnPrimaryDisplay = (width, height) => {
  // Get Primary Display (screen / monitor)
  const primaryDisplay = electron.screen.getPrimaryDisplay();

  let x, y;

  // TODO: how to do error handling in electron?
  if (!width || !height) {
    throw new Error('missing width and / or height!');
  }

  // If monitor 1 is primary display
  if (primaryDisplay.bounds.x === 0 && primaryDisplay.bounds.y === 0) {
    x = primaryDisplay.bounds.width / 2 - width / 2;
    y = primaryDisplay.bounds.height / 2 - height / 2;
  } else {
    // if monitor 2 and higher is primary display
    x = primaryDisplay.bounds.width / 2 - width / 2 + primaryDisplay.bounds.x;
    y = primaryDisplay.bounds.height / 2 - height / 2 + primaryDisplay.bounds.y;
  }

  return { x, y };
};

module.exports = centerOnPrimaryDisplay;
