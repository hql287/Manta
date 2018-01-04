// React Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
const format = require('date-fns/format');
const moment = require('moment');

// Styles
import styled from 'styled-components';

const InvoiceHeader = styled.div`
  flex: 1;
  flex: none;
  display: flex;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Company = styled.div`margin-bottom: 1.66667em;`;

const Recipient = styled.div``;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  h4 {
    font-size: 1.16667em;
    color: #dbbd8a;
    margin: 0;
    font-weight: 300;
  }
`;

const Heading = styled.h1`
  margin: 0 0 10px 0;
  font-size: 2em;
  font-weight: 400;
  color: #CBC189;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${props => props.accentColor.useCustom && `
    color: ${props.accentColor.color};
  `};
`;

// Component
function Header({invoice, profile, configs}) {
  const { recipient } = invoice;
  return (
    <InvoiceHeader>
      <LeftColumn>
        <Company>
          <h4>{profile.company}</h4>
          <p>{profile.fullname}</p>
          <p>{profile.address}</p>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
        </Company>
        {configs.showRecipient && (
          <Recipient>
            <h4> Billed To</h4>
            <p>{recipient.company}</p>
            <p>{recipient.fullname}</p>
            <p>{recipient.email}</p>
            <p>{recipient.phone}</p>
          </Recipient>
        )}
      </LeftColumn>
      <RightColumn>
        <Heading accentColor={configs.accentColor}>Invoice</Heading>
        <h4>
          #
          {truncate(invoice._id, {
            length: 8,
            omission: '',
          })}
        </h4>
        <p>Created {format(invoice.created_at, configs.dateFormat)}</p>
        <p>Due {moment(invoice.dueDate).format(configs.dateFormat)}</p>
      </RightColumn>
    </InvoiceHeader>
  );
}

Header.propTypes = {
  profile: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default Header;
