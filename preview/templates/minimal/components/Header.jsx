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

const Heading = styled.h1`
  font-family: 'Source Serif Pro', serif;
  font-size: 2.1em;
  font-weight: 400;
  margin-bottom: 1em;
  color: #2c323a;
  ${props => props.accentColor.useCustom && `
    color: ${props.accentColor.color};
  `};
`;

// Component
function Header({invoice, company, configs}) {
  return (
    <Wrapper>
      <div>
        <Heading accentColor={configs.accentColor}>Invoice</Heading>
        <h4 className="label">
          #
          {_.truncate(invoice._id, {
            length: 8,
            omission: '',
          })}
        </h4>
        <p>Created {format(invoice.created_at, 'DD/MM/YYYY')}</p>

        {invoice.dueDate && (
          <p>Due {moment(invoice.dueDate).format('DD/MM/YYYY')}</p>
        )}
      </div>
      {configs.showLogo && (
        <div>
          <img src={company.logo} alt="Logo" />
        </div>
      )}
    </Wrapper>
  );
}

Header.propTypes = {
  invoice: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,
};

export default Header;
