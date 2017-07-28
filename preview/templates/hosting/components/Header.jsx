// Node Libs
const path = require('path');

// React Libraries
import React from 'react';

// Component
const Header = props =>
  <header className="clearfix">
    <div id="logo">
      <img
        src={path.join(__dirname, '../assets/logo.png')}
      />
    </div>
    <div id="company">
      <h2 className="name">
        {props.company.company}
      </h2>
      <div>
        {props.company.address}
      </div>
      <div>
        {props.company.phone}
      </div>
      <div>
        {props.company.website}
      </div>
    </div>
  </header>;
export default Header;
