import React from 'react';
import path from 'path';
import Slide from '../Slide';

function Save({t}) {
  return (
    <Slide
      fromColor="#FFD200"
      toColor="#F7971E"
      heading={t('tour:slides:save:heading')}
      description={t('tour:slides:save:description')}
      imgSrc={path.resolve(__dirname, './imgs/Save.svg')}
      imgSize="460px"
    />
  );
}

export default Save;
