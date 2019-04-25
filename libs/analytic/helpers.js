const axios = require('axios');
const querystring = require('querystring');
const { remote } = require('electron');
const { PROTOCOL_VER, ANALTIC_URL, DATA_SOURCE } = require('./const');

function getDefaultParams() {
  return {
    v: PROTOCOL_VER,
    ds: DATA_SOURCE,
    // sr: getScreenRes(),
    // ua: getUserAgent(),
    // vp: getViewPort(),
  };
}

function getNow() {
  return Date.now();
}

function getScreenRes() {
  const screen = remote.screen.getPrimaryDisplay();
  return `${screen.size.width} x ${screen.size.height}`;
}

// TODO
function getUserAgent() {
  return null;
}

function getViewPort() {
  return null;
}

function dispatch(payload) {
  return new Promise((resolve, reject) => {
    axios
      .post(ANALTIC_URL, querystring.stringify(payload))
      .then(response => {
        resolve(response.status);
      })
      .catch(error => {
        if (error.response) {
          reject(error.response.status);
        } else if (error.request) {
          reject(error.request);
        } else {
          reject(error.message);
        }
        reject(error.config);
      });
  });
}

module.exports = {
  getNow,
  dispatch,
  getDefaultParams,
};
