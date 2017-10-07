import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';

import styled from 'styled-components';
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 40px;
`;

// Slides Components
import Slide from '../components/Slide';

function Slider({currentSlide}) {
  let slideToShow;
  switch (currentSlide) {
    case 1: {
      slideToShow = (
        <Slide
          imgSrc={path.resolve(__dirname, '../imgs/slide1.png')}
          header="Header One"
          description="Something 1"
        />
      );
      break;
    }
    case 2: {
      slideToShow = (
        <Slide
          imgSrc={path.resolve(__dirname, '../imgs/slide2.png')}
          header="Header Two"
          description="Something 2"
        />
      );
      break;
    }
    case 3: {
      slideToShow = (
        <Slide
          imgSrc={path.resolve(__dirname, '../imgs/slide3.png')}
          header="Header Three"
          description="Something 3"
        />
      );
      break;
    }
    default: {
      slideToShow = (
        <Slide
          imgSrc={path.resolve(__dirname, '../imgs/slide4.png')}
          header="Header Four"
          description="Something 4"
        />
      );
      break;
    }
  }
  return <Content>{slideToShow}</Content>;
}

Slider.propTypes = {
  currentSlide: PropTypes.number.isRequired,
};

export default Slider;
