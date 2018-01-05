// 3rd Party Libs
const appConfig = require('electron').remote.require('electron-settings');

// Sound Themes
const cs_sounds = require('../static/sounds/cs/index.js');
const default_sounds = require('../static/sounds/default/index.js');

let cache;
function preload() {
  cache = {};
  setSounds();
  for (const name in sounds) {
    if (!cache[name]) {
      const sound = sounds[name];
      const audio = (cache[name] = new window.Audio());
      audio.volume = sound.volume;
      audio.src = sound.url;
    }
  }
}

let sounds;
function setSounds() {
  const soundTheme = appConfig.get('general.sound');
  switch (soundTheme) {
    case 'cs': {
      sounds = cs_sounds;
      break;
    }
    default: {
      sounds = default_sounds;
      break;
    }
  }
}

function play(name) {
  const appMute = appConfig.get('general.muted');
  if (!appMute) {
    let audio = cache[name];
    if (!audio) {
      const sound = sounds[name];
      if (!sound) {
        throw new Error('Invalid sound name');
      }
      audio = cache[name] = new window.Audio();
      audio.volume = sound.volume;
      audio.src = sound.url;
    }
    audio.currentTime = 0;
    audio.play();
  }
}

module.exports = {
  preload,
  play,
};
