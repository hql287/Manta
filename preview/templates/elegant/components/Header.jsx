// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const _ = require('lodash');
const format = require('date-fns/format');
const moment = require('moment');

Header.propTypes = {
  invoice: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

// Component
function Header ({ company, invoice }) {
  const { recipient } = invoice;
  return (
    <header className="clearfix">
      <div id="logo">
        <img src={company.logo} />
      </div>
      <h1>
        INVOICE: #
        {_.truncate(invoice._id, {
          length: 8,
          omission: '',
        })}
      </h1>
      <div id="company" className="clearfix">
        <div>
          {company.company}
        </div>
        <div>
          {company.address}
        </div>
        <div>
          {company.phone}
        </div>
        <div>
          {company.website}
        </div>
      </div>
      <div id="project">
        <div>
          <span>CLIENT</span> { recipient.fullname }
        </div>
        <div>
          <span>EMAIL</span> { recipient.email }
        </div>
        <div>
          <span>CREATED: </span>
          {format(invoice.created_at, 'DD/MM/YYYY')}
        </div>
        <div>
          <span>DUE DATE: </span>
          {moment(invoice.dueDate).format('DD/MM/YYYY')}
        </div>
      </div>
    </header>
  );
}
export default Header;
