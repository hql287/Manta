import React from 'react';
import path from 'path';
import Slide from '../Slide';

function Success({t}) {
  return (
    <Slide
      fromColor="#FFFFFF"
      toColor="#ECE9E6"
      heading={t('tour:slides:success:heading')}
      description={t('tour:slides:success:description')}
      imgSrc={path.resolve(__dirname, './imgs/Success.svg')}
      imgSize="425px"
    />
  );
}

export default Success;
