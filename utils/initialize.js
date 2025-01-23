import { createTourWindow } from '../windows/tourWindow.js';
import { createMainWindow } from '../windows/mainWindow.js';
import { createPreviewWindow } from '../windows/previewWindow.js';
import { setInitialValues } from '../utils/configs.js';
import { migrateData } from '../helpers/migration.js';
import { addDevToolsExtension } from '../helpers/devTools.js';
import { addEventListeners } from '../events/ipcListeners.js';
import { loadMainProcessFiles } from '../loaders/mainProcessFiles.js';

let tourWindow, mainWindow, previewWindow;

export async function initializeApp() {
  const isDev = process.env.NODE_ENV === 'development';

  tourWindow = createTourWindow();
  mainWindow = createMainWindow();
  previewWindow = createPreviewWindow();

  setInitialValues();
  migrateData();
  if (isDev) addDevToolsExtension();
  addEventListeners(tourWindow, mainWindow, previewWindow);
  loadMainProcessFiles();

  try {
    const { showWindow } = await import('../main/tour.js');
    showWindow('startup');
  } catch (error) {
    console.error('Error during app activation:', error);
  }

  return {
    tourWindow,
    mainWindow,
    previewWindow,
  }
}
