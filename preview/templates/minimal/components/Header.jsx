// React Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
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
  text-transform: capitalize;
`;

const Heading = styled.h1`
  font-family: 'Lora', serif;
  font-size: 2.1em;
  font-weight: 400;
  margin-bottom: 1em;
  color: #2c323a;
  ${props =>
    props.accentColor.useCustom &&
    `
    color: ${props.accentColor.color};
  `};
`;

// Component
function Header({ t, invoice, profile, configs }) {
  const currentLanguage = configs.language;
  return (
    <Wrapper>
      <div>
        <Heading accentColor={configs.accentColor}>
          {t('preview:common:invoice', {lng: currentLanguage})}
        </Heading>
        <h4 className="label">
          # {' '}
          { invoice.invoiceID
            ? invoice.invoiceID
            : truncate(invoice._id, {
                length: 8,
                omission: '', })
          }
        </h4>
        <p>
          {t('preview:common:created', {lng: currentLanguage})}:
          {' '}
          {moment(invoice.created_at).lang(currentLanguage).format(configs.dateFormat)}
        </p>
        {invoice.dueDate && (
          <p>
            {t('preview:common:due', {lng: currentLanguage})}:
            {' '}
            {moment(invoice.dueDate).lang(currentLanguage).format(configs.dateFormat)}
          </p>
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
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Header;
