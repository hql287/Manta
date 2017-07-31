// Electron Libs
const BrowserWindow = require('electron').remote.BrowserWindow;
const ipc           = require('electron').ipcRenderer;

// 3rd Party Libs
const appConfig = require('electron').remote.require('electron-settings');

const modal        = document.getElementById('modal');
const modalType    = document.getElementById('modalType');
const modalTitle   = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalButtons = document.getElementById('modalButtons');
const mainWindow   = BrowserWindow.fromId(appConfig.get('mainWindowID'));

ipc.on('update-modal', (e, dialogOptions, returnChannel, ...rest) => {
  populateModalContent(dialogOptions);
  modal.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.tagName === 'A') {
      let index = event.target.getAttribute('alt');
      if (returnChannel !== '') {
        mainWindow.send(returnChannel, parseInt(index), ...rest);
      }
      BrowserWindow.getFocusedWindow().close();
    }
  });
});

function populateModalContent(options) {
  let modalIcon = '';

  switch (options.type) {
    case 'info': {
      modal.classList.add('modal-info');
      modalIcon = '<i class="ion-alert"></i>';
      break;
    }
    case 'warning': {
      modal.classList.add('modal-warning');
      modalIcon = '<i class="ion-alert-circled"></i>';
      break;
    }
    default: {
      modal.classList.add('modal-info');
      modalIcon = '<i class="ion-information-circled"></i>';
      break;
    }
  }

  modalType.innerHTML    = modalIcon;       // Icon
  modalTitle.innerHTML   = options.title;   // Update Titlte
  modalMessage.innerHTML = options.message; // Message

  // Default Button
  if (options.buttons === undefined || options.buttons.length === 0) {
    let defaultBtn    = document.createElement('a');
    let defaultBtnTxt = document.createTextNode('Ok');
    defaultBtn.appendChild(defaultBtnTxt);
    defaultBtn.setAttribute('href', '#');
    modalButtons.appendChild(defaultBtn);
  } else {
  // Buttons
    options.buttons.forEach((buttonTxt, index) => {
      let btn    = document.createElement('a');
      let btnTxt = document.createTextNode(buttonTxt);
      btn.appendChild(btnTxt);
      btn.setAttribute('href', '#');
      btn.setAttribute('alt', index);
      modalButtons.appendChild(btn);
    });
  }
}
