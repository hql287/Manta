// Node Libs
const path = require('path');

// React Libraries
import React from 'react';

// 3rd Party Libs
const format = require('date-fns/format');
const _ = require('lodash');

// Component
const Header = props =>
  <header className="clearfix">
    <div id="logo">
      <img src={path.join(__dirname, '../assets/logo.png')} />
    </div>
    <h1>
      INVOICE:
      {_.truncate(props.receipt._id, {
        length: 8,
        omission: '',
      })}
    </h1>
    <div id="company" className="clearfix">
      <div>
        {props.company.company}
      </div>
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
    <div id="project">
      <div>
        <span>CLIENT</span> John Doe
      </div>
      <div>
        <span>ADDRESS</span> 796 Silver Harbour, TX 79273, US
      </div>
      <div>
        <span>DATE: </span>
        {format(props.receipt.created_at, 'DD-MM-YYYY')}
      </div>
    </div>
  </header>;
export default Header;
