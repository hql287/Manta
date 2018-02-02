import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

import Save from '../components/slides/Save'; // Save PDF & Send
import Create from '../components/slides/Create'; // Explains how Form works
import Welcome from '../components/slides/Welcome'; // Welcome Slide
import Preview from '../components/slides/Preview'; // Preview & Customize Template
import Success from '../components/slides/Success'; // Success

function Slider({ t, currentSlide }) {
  return (
    <Content>
      {currentSlide === 1 && <Welcome t={t} />}
      {currentSlide === 2 && <Create t={t} />}
      {currentSlide === 3 && <Preview t={t} />}
      {currentSlide === 4 && <Save t={t} />}
      {currentSlide === 5 && <Success t={t} />}
    </Content>
  );
}

Slider.propTypes = {
  currentSlide: PropTypes.number.isRequired,
};

export default Slider;
