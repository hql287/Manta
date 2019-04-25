// Libs
const { ipcMain } = require('electron');
const appConfig = require('electron-settings');
const isDev = require('electron-is-dev');
const Analytics = require('../libs/analytic');
const pkg = require('../package.json');
const firstRun = require('first-run');

// Options
const trackingID = 'UA-109914010-2'; // tid
const appName = pkg.name; // an
const appVersion = pkg.version; // av
const clientID = appConfig.get('userData.uuid'); // cid
const userLanguage = appConfig.get('general.language'); // ul
const allowsAnalytic = appConfig.get('general.allowsAnalytic');

// Init tracker
const tracker = new Analytics(trackingID, clientID, {
  an: appName,
  av: appVersion,
  ul: userLanguage,
});

// Add event listener
ipcMain.on('send-hit-to-analytic', (event, hitType, hitParams) => {
  if (!isDev) return;
  if (!allowsAnalytic) return;
  tracker.track(hitType, hitParams);
});

// Track installations
if (firstRun()) {
  tracker.track('event', {
    ec: 'Installation',
    ea: 'New Installation',
    el: 'New Installation',
    ev: 1,
  });
}

// Track install of specific version
if (firstRun({name: `${appName}-${appVersion}`})) {
  tracker.track('event', {
    ec: 'Installation',
    ea: `Install version ${appVersion}`,
    el: `Install version ${appVersion}`,
    ev: 1
  });
}
