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
    props.color &&
    `
    h4 {
      border-bottom:
        4px
        solid
        rgba(
          ${props.color.r},
          ${props.color.g},
          ${props.color.b},
          ${props.color.a}
        );
    }
  `};
`;

// Component
function Footer({invoice, configs}) {
  return invoice.note ? (
    <InvoiceFooter color={configs.accentColor}>
      <h4>Notice</h4>
      <p>{invoice.note}</p>
    </InvoiceFooter>
  ) : null;
}

Footer.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default Footer;
