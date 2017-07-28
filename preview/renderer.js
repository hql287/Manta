// Electron Libs
const ipc = require('electron').ipcRenderer;

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Custom Components
import Receipt from './containers/Receipt.jsx';

// Render Preview Window
ipc.on('update-preview', (event, receiptData) => {
  ReactDOM.render(
    <Receipt receiptData={receiptData} />,
    document.getElementById('receiptWrapper')
  );
});

