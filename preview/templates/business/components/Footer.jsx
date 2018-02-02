// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const InvoiceFooter = styled.div`
  flex: none;
  h4 {
    padding-bottom: 0.83333em;
    border-bottom: 4px solid #efefd1;
  }
  ${props =>
    props.accentColor.useCustom &&
    `
    h4 { border-bottom: 4px solid ${props.accentColor.color}; }
  `};
`;

// Component
function Footer({ t, invoice, configs }) {
  return invoice.note ? (
    <InvoiceFooter accentColor={configs.accentColor}>
      <h4>{ t('preview:common:notice') }</h4>
      <p>{invoice.note}</p>
    </InvoiceFooter>
  ) : null;
}

Footer.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Footer;
