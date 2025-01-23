// Prevent window to open dropped file
require('../libs/dragNdrop.js');

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';

ReactDOM.render(
  <Dialog />,
  document.getElementById('root')
);
