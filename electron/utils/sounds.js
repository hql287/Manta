// 3rd Party Libs
import appConfig from 'electron-settings'

// Sound Themes
import cs_sounds from '../static/sounds/cs/index.js'
import default_sounds from '../static/sounds/default/index.js'

let cache
export function preload() {
  cache = {}
  setSounds()
  for (const name in sounds) {
    if (!cache[name]) {
      const sound = sounds[name]
      const audio = (cache[name] = new window.Audio())
      audio.volume = sound.volume
      audio.src = sound.url
    }
  }
}

let sounds
function setSounds() {
  const soundTheme = appConfig.get('general.sound')
  switch (soundTheme) {
    case 'cs': {
      sounds = cs_sounds
      break
    }
    default: {
      sounds = default_sounds
      break
    }
  }
}

export function play(name) {
  const appMute = appConfig.get('general.muted')
  if (!appMute) {
    let audio = cache[name]
    if (!audio) {
      const sound = sounds[name]
      if (!sound) {
        throw new Error('Invalid sound name')
      }
      audio = cache[name] = new window.Audio()
      audio.volume = sound.volume
      audio.src = sound.url
    }
    audio.currentTime = 0
    audio.play()
  }
}

//module.exports = {
//preload,
//play,
//}
