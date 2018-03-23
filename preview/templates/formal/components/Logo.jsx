// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const InvoiceLogo = styled.div `
  grid-column: 1 / 9;
  grid-row: 1;
  max-height: 6em;
  img {
    width: auto;
    max-height: 4em;
  }
`;

const Wrapper = styled.div `
  grid-column: 1 / 9;
  grid-row: 1;
  margin-bottom: 2em;
  ${props => props.logoSize && `
    max-width: ${props.logoSize}%;
  `};
  img {
    width: 100%;
    height: auto;
  }
`;

// Component
function Logo({profile, configs}) {
  const {showLogo, logoSize} = configs;
  return showLogo
    ? (<Wrapper logoSize={logoSize}>
      <img src={profile.logo} alt="Logo"/>
    </Wrapper>)
    : null;
}

Logo.propTypes = {
  configs: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default Logo;
