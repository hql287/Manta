// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const _ = require('lodash');
const format = require('date-fns/format');
const moment = require('moment');

// Proptypes
Header.propTypes = {
  invoice: PropTypes.object.isRequired,
};

// Component
function Header({ invoice }) {
  return (
    <h1 className="clearfix">
      <small>
        <span>CREATED DATE</span>
        <br /> {format(invoice.created_at, 'DD-MM-YYYY')}
      </small>{' '}
      INVOICE #
      {_.truncate(invoice._id, {
        length: 8,
        omission: '',
      })}
      <small>
        <span>DUE DATE</span>
        <br /> {moment(invoice.dueDate).format('DD-MM-YYYY')}
      </small>{' '}
    </h1>
  );
}

export default Header;
