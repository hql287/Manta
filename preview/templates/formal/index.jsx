// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Helper
import {setBaseFontSize} from '../../helper';

// Styles
import styled from 'styled-components';

const Invoice = styled.div `
  width: 100%;
  padding: 3.33333em;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto auto 1fr auto auto;
  grid-row-gap: 1.6em;
  align-content: space-between;
  font-family: 'IBM Plex Mono', monospace;
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0.01em;
  ${props => props.baseFontSize && `
    font-size: ${props.baseFontSize};
  `}
  }

  h1, th {
    font-weight: bold;
    font-size: 0.7em;
    font-weight: 600;
    line-height: 1.6em;
    padding-bottom: 1em;
  }

  h2, td, p {
    font-weight: normal;
    font-size: 0.7em;
    font-weight: 100;
    line-height: 1.6em;
  }

  * {
    margin-bottom: 0;
  }

`;

// Child Components
import Logo from './components/Logo';
import Header from './components/Header';
import Main from './components/Main';
import Note from './components/Note';
import Footer from './components/Footer';

// Component
function Formal(props) {
  return (
    <Invoice baseFontSize={setBaseFontSize(props.configs.fontSize)}>
      <Logo {...props}/>
      <Header {...props}/>
      <Main {...props}/>
      <Note {...props}/>
      <Footer {...props}/>
    </Invoice>
  );
}

Formal.propTypes = {
  invoice: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired
};

export default Formal;
