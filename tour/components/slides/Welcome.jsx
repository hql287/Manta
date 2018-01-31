import React from 'react';
import path from 'path';
import Slide from '../Slide';

function Welcome({t}) {
  return (
    <Slide
      inverted
      fromColor="#CAD2E8"
      toColor="#6979A4"
      heading={t('tour:slides:welcome:heading')}
      description={t('tour:slides:welcome:description')}
      imgSrc={path.resolve(__dirname, './imgs/Welcome.svg')}
      imgSize="475px"
    />
  );
}

export default Welcome;
