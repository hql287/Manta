// React Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
const format = require('date-fns/format');
const moment = require('moment');

// Styles
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: auto;
    max-height: 5em;
  }
`;

const Heading = styled.h1`
  font-family: 'Lora', serif;
  font-size: 2.1em;
  font-weight: 400;
  margin-bottom: 1em;
  color: #2c323a;
  ${props => props.accentColor.useCustom && `
    color: ${props.accentColor.color};
  `};
`;

// Component
function Header({invoice, profile, configs}) {
  return (
    <Wrapper>
      <div>
        <Heading accentColor={configs.accentColor}>Invoice</Heading>
        <h4 className="label">
          #
          {truncate(invoice._id, {
            length: 8,
            omission: '',
          })}
        </h4>
        <p>Created {format(invoice.created_at, configs.dateFormat)}</p>
        {invoice.dueDate && (
          <p>Due {moment(invoice.dueDate).format(configs.dateFormat)}</p>
        )}
      </div>
      {configs.showLogo && (
        <div>
          <img src={profile.logo} alt="Logo" />
        </div>
      )}
    </Wrapper>
  );
}

Header.propTypes = {
  invoice: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,
};

export default Header;
