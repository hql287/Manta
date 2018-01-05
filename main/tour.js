// Libs
const { BrowserWindow, ipcMain } = require('electron');
const appConfig = require('electron-settings');

// Get Windows Instance
const tourWindowID = appConfig.get('tourWindowID');
const mainWindowID = appConfig.get('mainWindowID');
const previewWindowID = appConfig.get('previewWindowID');
const tourWindow = BrowserWindow.fromId(tourWindowID);
const mainWindow = BrowserWindow.fromId(mainWindowID);
const previewWindow = BrowserWindow.fromId(previewWindowID);

ipcMain.on('start-tour', startTour);
ipcMain.on('end-tour', endTour);

// TOUR
function startTour() {
  // Save current visibility state for restoring later
  saveWinsVisibleState();
  // Hide all windows
  hideAllWindows();
  // Show the tour window
  tourWindow.show();
  tourWindow.focus();
  // Update tour active state
  appConfig.set('tour.isActive', true);
}

function endTour() {
  // Update tour state
  appConfig.set('tour', {
    hasBeenTaken: true,
    isActive: false,
  });
  // Hide the tourWindow
  tourWindow.hide();
  // Restore windows state
  restoreWindows();
  // Update new state for next use
  saveWinsVisibleState();
}

function showWindow(context) {
  const tour = appConfig.get('tour');
  if (tour.isActive) {
    if (context === 'startup') {
      tourWindow.on('ready-to-show', () => {
        tourWindow.show();
        tourWindow.focus();
      });
      return;
    }
    if (context === 'activate') {
      tourWindow.show();
      tourWindow.focus();
      return;
    }
  }
  if (tour.hasBeenTaken) {
    if (context === 'startup') {
      mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
      });
      return;
    }
    if (context === 'activate') {
      restoreWindows();
      return;
    }
  }
  startTour();
}

function restoreWindows() {
  const { isMainWinVisible, isPreviewWinVisible } = appConfig.get(
    'winsLastVisibleState'
  );
  if (!isMainWinVisible && !isPreviewWinVisible) {
    mainWindow.show();
    mainWindow.focus();
    return;
  }
  isMainWinVisible && mainWindow.show();
  isPreviewWinVisible && previewWindow.show();
}

// HELPER FUNCTIONS
function hideAllWindows() {
  mainWindow.hide();
  previewWindow.hide();
}

function saveWinsVisibleState() {
  appConfig.set('winsLastVisibleState', {
    isMainWinVisible: mainWindow.isVisible(),
    isPreviewWinVisible: previewWindow.isVisible(),
  });
}

module.exports = {
  showWindow,
};
