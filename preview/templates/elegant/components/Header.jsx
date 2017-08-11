// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const format = require('date-fns/format');
const _ = require('lodash');

Header.propTypes = {
  invoice: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

// Component
function Header (props) {
  return (
    <header className="clearfix">
      <div id="logo">
        <img src={props.company.logo} />
      </div>
      <h1>
        INVOICE:
        {_.truncate(props.invoice._id, {
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
          {format(props.invoice.created_at, 'DD-MM-YYYY')}
        </div>
      </div>
    </header>
  );
}
export default Header;
