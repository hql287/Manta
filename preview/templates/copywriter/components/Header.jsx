// React Libraries
import React from 'react';
import PropTypes from 'prop-types';
const format = require('date-fns/format');
const moment = require('moment');
const _ = require('lodash');

// Styles
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Component
function Header({invoice, company, configs})  {
  return (
    <Wrapper>
      <div>
        <h1>Invoice</h1>
        <h4 className="label">
          #
          {_.truncate(invoice._id, {
            length: 8,
            omission: '',
          })}
        </h4>
        <p>
          Created {format(invoice.created_at, 'DD/MM/YYYY')}
        </p>

        {invoice.dueDate &&
          <p>
            Due Date {moment(invoice.dueDate).format('DD/MM/YYYY')}
          </p>}
      </div>
      { configs.showLogo &&
        <div>
          <img src={company.logo} alt="Logo"/>
        </div>
      }
    </Wrapper>
  );
}

Header.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default Header;
