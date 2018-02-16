// React Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
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

const Company = styled.div`
  margin-bottom: 1.66667em;
`;

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
  color: #cbc189;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${props =>
    props.accentColor.useCustom &&
    `
    color: ${props.accentColor.color};
  `};
`;

// Component
function Header({ t, invoice, profile, configs }) {
  const { recipient } = invoice;
  const currentLanguage = configs.language;
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
            <h4>{ t('preview:common:billedTo', {lng: currentLanguage}) }</h4>
            <p>{recipient.company}</p>
            <p>{recipient.fullname}</p>
            <p>{recipient.email}</p>
            <p>{recipient.phone}</p>
          </Recipient>
        )}
      </LeftColumn>
      <RightColumn>
        <Heading accentColor={configs.accentColor}>{ t('preview:common:invoice', {lng: currentLanguage}) }</Heading>
        <h4>
          #
          { invoice.invoiceID
            ? invoice.invoiceID
            : truncate(invoice._id, {
                length: 8,
                omission: '', })
          }
        </h4>
        <p>
          { t('preview:common:created', {lng: currentLanguage}) }
          {' '}
          {moment(invoice.created_at).lang(currentLanguage).format(configs.dateFormat)}
        </p>
        <p>
          { t('preview:common:due', {lng: currentLanguage}) }
          {' '}
          {moment(invoice.dueDate).lang(currentLanguage).format(configs.dateFormat)}
        </p>
      </RightColumn>
    </InvoiceHeader>
  );
}

Header.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Header;
