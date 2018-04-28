// Libs
const os = require('os');
const { app } = require('electron');
const { ipcMain } = require('electron');
const axios = require('axios');
const isDev = require('electron-is-dev');
const geoip = require('geoip-lite');
const isOnline = require('is-online');
const prettyMs = require('pretty-ms');
const publicIp = require('public-ip');
const osLocale = require('os-locale');
const querystring = require('querystring');
const appConfig = require('electron-settings');

// Measurement Protocol Variables
const analyticsURL = 'https://www.google-analytics.com/collect';
const protocolVersion = 1; // v
const trackingID = 'UA-109914010-2'; // tid
const dataSource = 'app'; // ds
const appName = app.getName(); // an
const appVersion = app.getVersion(); // av
const clientID = appConfig.get('userData.uuid'); // cid
const userLanguage = appConfig.get('general.language'); // ul

// Rercord unsent hits of current session;
const currentSession = [];
// Unsent hit from last sessions
const unsentSessions = appConfig.get('userData.unsentSessions');

// Main Actions
// ==============================================
ipcMain.on('save-current-session-hits', event => {
  // Do nothing if the current session contains no unsent hit
  if (!currentSession.length) return;
  // Otherwise, save it to the "DB"
  const newUnsentSessions = [...unsentSessions, currentSession];
  saveUnsentSessions(newUnsentSessions);
});

ipcMain.on('send-hit-to-analytic', (event, hitParams) => {
  // Don't run in devMode
  if (isDev) return;
  // Create payload
  const payload = createPayload(hitParams);
  // Attemp to send hit
  isOnline().then(online => {
    if (online) {
      dispatch(payload)
        .then(res => {
          console.log('Hit sent successfully');
        })
        .catch(err => {
          currentSession.push(payload);
          console.log(err);
        });
    } else {
      currentSession.push(payload);
      console.log('currentSession: ', currentSession);
      console.log('No Internet');
    }
  });
});

// Init main function();
processUnsentSessions(unsentSessions);

// Main Function
// =============================================
async function processUnsentSessions(unsentSessions) {
  if (!unsentSessions.length) return;
  const promiseArrays = composePromisesArray(unsentSessions);
  // Record resolved promises
  const resolvedPromises = [];
  // Run promises in sequence
  for (const array of promiseArrays) {
    await Promise.all(array)
      .then(res => {
        console.log(res);
        resolvedPromises.push(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // Handling Error
  if (!resolvedPromises.length) return;
  // Clean up
  const newUnsentSessions = updateUnsentSessions(
    unsentSessions,
    resolvedPromises
  );
  saveUnsentSessions(newUnsentSessions);
}

// Helpers
// =============================================
function saveUnsentSessions(unsentSessions) {
  appConfig.set('userData.unsentSessions', unsentSessions);
}

function composePromisesArray(unsentSessions) {
  return unsentSessions.map(session =>
    session.map(payload => dispatch(payload))
  );
}

// Remove sent hits from all sessions and also remove empty sessions
function updateUnsentSessions(unsentSessions, resolvedPromises) {
  return unsentSessions.reduce((acc, session, sessionIndex) => {
    const filteredSession = session.filter(
      (payload, payloadIndex) =>
        resolvedPromises[sessionIndex][payloadIndex] !== 200
    );
    if (filteredSession.length) acc.push(filteredSession);
    return acc;
  }, []);
}

function createPayload(hitParams) {
  return Object.assign({}, hitParams, {
    // Required Params
    v: protocolVersion,
    cid: clientID,
    tid: trackingID,
    // Hit Params
    sc: hitParams.sc ? hitParams.sc : 'start',
    dp: hitParams.cd,
    ds: dataSource,
    // App Params
    an: appName,
    av: appVersion,
    // User Params
    ul: userLanguage,
    // System Info
  });
}

function dispatch(payload) {
  return new Promise((resolve, reject) => {
    axios
      .post(analyticsURL, querystring.stringify(payload))
      .then(response => {
        resolve(response.status);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('ERROR');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          reject(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          console.log(error.request);
          reject(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          reject(error.message);
        }
        console.log(error.config);
        reject(error.config);
      });
  });
}
