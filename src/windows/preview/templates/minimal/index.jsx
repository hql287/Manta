// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
const Invoice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 80px 120px;
  ${props =>
    props.baseFontSize &&
    `
    font-size: ${props.baseFontSize};
  `} .label {
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 0.8em;
    line-height: 1.75;
    color: #2c323a;
    letter-spacing: 1px;
    margin-bottom: 0.7em;
    text-transform: uppercase;
  }
  p {
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 0.8em;
    color: #71717a;
    margin: 0;
    line-height: 1.75;
  }
`;

// Helper
import { setBaseFontSize } from '../../helper';

// Child Components
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';

// Component
function Minimal(props) {
  return (
    <Invoice baseFontSize={setBaseFontSize(props.configs.fontSize)}>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
    </Invoice>
  );
}

Minimal.propTypes = {
  invoice: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,
};

export default Minimal;
