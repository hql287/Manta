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
  padding: 3.57em 10em;
  font-size: .875em;

  h1 {
    font-family: 'Source Serif Pro', serif;
    font-size: 2.1em;
    color: #2c323a;
    font-weight: 400;
    margin-bottom: 1em;
  }

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

  table {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  th {
    font-weight: 500;
  }
`;

// Child Components
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';

// Component
function Copywriter(props) {
  return (
    <Invoice>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
    </Invoice>
  );
}

Copywriter.propTypes = {
  invoice: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,
};

export default Copywriter;
