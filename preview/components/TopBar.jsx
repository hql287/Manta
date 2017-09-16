// Libs
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #F9FAFA;
  color: white;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  -webkit-app-region: drag;
  border-bottom: 1px solid rgba(0,0,0,.1);
  a {
    display: flex;
    color: #4F555C;
    text-transform: uppercase;
    font-size: 12px;
    margin-right: 20px;
    font-weight: 600;
    text-decoration: none;
  }
`;

const Select = styled.select`
  width: 150px;
  height: 24px;
  margin-right: 20px;
`

function TopBar({changeTemplate, printPDF}) {
  return (
    <Wrapper className="no-print">
      <Select onChange={changeTemplate}>
        <option value="default">Default</option>
        <option value="hosting">Hosting</option>
        <option value="elegant">Elegant</option>
        <option value="classic">Classic</option>
      </Select>
      <a href="#" onClick={printPDF}>Save</a>
    </Wrapper>
  );
}

TopBar.propTypes = {
  changeTemplate: PropTypes.func.isRequired,
  printPDF: PropTypes.func.isRequired,
};

export default TopBar;
