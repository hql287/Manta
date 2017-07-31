// Node Libs
const path = require('path');
const glob = require('glob');

// Custom Libs
const sounds = require(path.join(__dirname, '../libs/sounds.js'));

// Imports Main Renderere Files
function loadMaiRendererFiles() {
  const files = glob.sync(path.join(__dirname, './renderers/*.js'));
  files.forEach(file => require(file));
  sounds.preload();
}

function initialize() {
  loadMaiRendererFiles();
  sounds.play('STARTUP');
  console.timeEnd('init');
}

initialize();
