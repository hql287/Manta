// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Style
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

// Components
import SideBar from './containers/SideBar';
import MainContent from './containers/MainContent';

// Components
function Viewer() {
  return (
    <Wrapper>
      <SideBar/>
      <MainContent/>
    </Wrapper>
  );
}

Viewer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // invoice: PropTypes.object.isRequired,
};

export default Viewer;
