// React Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
const appConfig = require('electron').remote.require('electron-settings');
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
function Header({invoice, company, configs}) {
  const dateFormat = appConfig.get('appSettings.dateFormat');
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
        <p>Created {format(invoice.created_at, dateFormat)}</p>
        {invoice.dueDate && (
          <p>Due {moment(invoice.dueDate).format(dateFormat)}</p>
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
