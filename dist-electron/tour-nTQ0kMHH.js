import { ipcMain, BrowserWindow } from "electron";
import { a as appConfig } from "./app-Ceizw8vF.js";
let tourWindow, mainWindow, previewWindow;
function initializeWindows() {
  const tourWindowID = appConfig.getSync("tourWindowID");
  const mainWindowID = appConfig.getSync("mainWindowID");
  const previewWindowID = appConfig.getSync("previewWindowID");
  if (tourWindowID) {
    tourWindow = BrowserWindow.fromId(tourWindowID);
  }
  if (mainWindowID) {
    mainWindow = BrowserWindow.fromId(mainWindowID);
  }
  if (previewWindowID) {
    previewWindow = BrowserWindow.fromId(previewWindowID);
  }
}
initializeWindows();
ipcMain.on("start-tour", startTour);
ipcMain.on("end-tour", endTour);
function startTour() {
  console.log("startTour");
  if (!tourWindow) return;
  saveWinsVisibleState();
  hideAllWindows();
  tourWindow.show();
  tourWindow.focus();
  appConfig.setSync("tour.isActive", true);
}
function endTour() {
  console.log("endTour");
  if (!tourWindow) return;
  appConfig.setSync("tour", {
    hasBeenTaken: true,
    isActive: false
  });
  tourWindow.hide();
  restoreWindows();
  saveWinsVisibleState();
}
function saveWinsVisibleState() {
  appConfig.setSync("winsLastVisibleState", {
    isMainWinVisible: (mainWindow == null ? void 0 : mainWindow.isVisible()) || false,
    isPreviewWinVisible: (previewWindow == null ? void 0 : previewWindow.isVisible()) || false
  });
}
function restoreWindows() {
  const { isMainWinVisible, isPreviewWinVisible } = appConfig.getSync(
    "winsLastVisibleState"
  );
  if (isMainWinVisible) mainWindow == null ? void 0 : mainWindow.show();
  if (isPreviewWinVisible) previewWindow == null ? void 0 : previewWindow.show();
}
function hideAllWindows() {
  mainWindow == null ? void 0 : mainWindow.hide();
  previewWindow == null ? void 0 : previewWindow.hide();
}
function showWindow(context) {
  console.log("showWindow", context);
  const tour = appConfig.getSync("tour");
  console.log("tour", tour);
  console.log("showWindow", context);
  if (tour.isActive) {
    if (context === "startup") {
      tourWindow == null ? void 0 : tourWindow.once("ready-to-show", () => {
        tourWindow.show();
        tourWindow.focus();
      });
    } else if (context === "activate") {
      tourWindow == null ? void 0 : tourWindow.show();
      tourWindow == null ? void 0 : tourWindow.focus();
    }
  } else if (tour.hasBeenTaken) {
    if (context === "startup") {
      mainWindow == null ? void 0 : mainWindow.once("ready-to-show", () => {
        mainWindow.show();
        mainWindow.focus();
      });
    } else if (context === "activate") {
      restoreWindows();
    }
  } else {
    startTour();
  }
}
export {
  showWindow
};
