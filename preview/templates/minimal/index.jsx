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
  padding: 100px 140px;
  ${ props => props.baseFontSize && `
    font-size: ${props.baseFontSize};
  `}
  .label {
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 0.8em;
    color: #2C323A;
    letter-spacing: 1px;
    margin-bottom: .7em;
    text-transform: uppercase;
  }
  p {
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 0.8em;
    color: #71717A;
    margin-bottom: 0;
    margin-top: .5em;
  }
`;

// Child Components
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';

function setBaseFontSize(configs) {
  let size;
  switch(configs.fontSize) {
    case '300': {
      size = '1.05em';
      break;
    }
    case '200': {
      size = '.95em';
      break;
    }
    default: {
      size = '.875em';
      break;
    }
  }
  return size;
}

// Component
function Minimal(props) {
  return (
    <Invoice baseFontSize={setBaseFontSize(props.configs)}>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
    </Invoice>
  );
}

Minimal.propTypes = {
  invoice: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,
};

export default Minimal;
