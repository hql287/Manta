// 3rd Party Libs
// const appConfig = require('electron').remote.require('electron-settings');

// Sound Themes
// const default_sounds = require('../../sound/default/index.js');
const modern_sounds = require('../static/sounds/modern/index.js');
// const cs_sounds = require('../../sound/cs/index.js');

/* Cache of Audio elements, for instant playback */
let cache;
let sounds = modern_sounds;

// function setSounds() {
//   let soundTheme = appConfig.get('soundTheme');
//   switch (soundTheme) {
//     case 'modern': {
//       sounds = modern_sounds;
//       break;
//     }
//     case 'cs': {
//       sounds = cs_sounds;
//       break;
//     }
//     default: {
//       sounds = default_sounds;
//       break;
//     }
//   }
// }

function preload() {
  cache = {};
  // setSounds();
  for (let name in sounds) {
    if (!cache[name]) {
      let sound = sounds[name];
      let audio = (cache[name] = new window.Audio());
      audio.volume = sound.volume;
      audio.src = sound.url;
    }
  }
}

function play(name) {
  // const appMute = appConfig.get('muteApp');
  // if (!appMute) {
  let audio = cache[name];
  if (!audio) {
    let sound = sounds[name];
    if (!sound) {
      throw new Error('Invalid sound name');
    }
    audio = cache[name] = new window.Audio();
    audio.volume = sound.volume;
    audio.src = sound.url;
  }
  audio.currentTime = 0;
  audio.play();
  // }
}

module.exports = {
  preload,
  play,
};
