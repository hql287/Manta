// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const InvoiceLogo = styled.div`
  flex: 1;
  max-height: 6em;
  img {
    width: auto;
    max-height: 4em;
  }
`;

// Component
function Logo({company, configs}) {
  return configs.showLogo ? (
    <InvoiceLogo>
      <img src={company.logo} alt="Logo" />
    </InvoiceLogo>
  ) : null;
}

Logo.propTypes = {
  configs: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

export default Logo;
