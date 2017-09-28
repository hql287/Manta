// Libs
import sounds from '../libs/sounds';

function initialize() {
  sounds.preload();
  sounds.play('STARTUP');
  console.timeEnd('init');
}

initialize();
