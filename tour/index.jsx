// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Root Component
import Tour from './containers/Tour';

ReactDOM.render(
  <Tour/>,
  document.getElementById('root')
);

// Accepting Hot Updates
module.hot && module.hot.accept();
