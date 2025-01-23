  //const scripts = [];
  //const isDev = require('electron-is-dev');
//console.log('globalThis: ', globalThis);
//console.log('isDev: ', globalThis.isDev);

  //if (isDev)
    //scripts.push(
      //'http://localhost:5178/tour.dev.js'
    //);
  //} else {
    //scripts.push(
      //'../prod/tour.prod.js'
    //);
  //}
  //document.write(
    //scripts
      //.map(script => '<script defer src="' + script + '"><\/script>')
      //.join('')
  //);
      console.log('isDev', window.electronAPI?.isDev); // Should log: "Hello, World!"
