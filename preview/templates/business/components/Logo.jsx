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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 2em;
  ${props =>
    props.logoSize &&
    `
    max-width: ${props.logoSize}%;
  `};
  img {
    width: 100%;
    height: auto;
  }
`;

// Component
function Logo({ profile, configs }) {
  const { showLogo, logoSize } = configs;
  return showLogo ? (
    <Wrapper logoSize={logoSize}>
      <img src={profile.logo} alt="Logo" />
    </Wrapper>
  ) : null;
}

Logo.propTypes = {
  configs: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};


export default Logo;
