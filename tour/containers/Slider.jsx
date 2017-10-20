import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// Welcome Slide
import Welcome from '../components/slides/Welcome';
// Explains how Form works
import Create from '../components/slides/Create';
// Preview & Customize Template
import Preview from '../components/slides/Preview';
// Save PDF & Send
import Save from '../components/slides/Save';
// Success
import Success from '../components/slides/Success';

function Slider({totalSlide, currentSlide}) {
  return (
    <Content>
      {currentSlide === 1 && <Welcome />}
      {currentSlide === 2 && <Create />}
      {currentSlide === 3 && <Preview />}
      {currentSlide === 4 && <Save />}
      {currentSlide === 5 && <Success />}
    </Content>
  );
}

Slider.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  totalSlide: PropTypes.number.isRequired,
};

export default Slider;
