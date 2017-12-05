import React from 'react';
import path from 'path';
import Slide from '../Slide';

const description = `
Manta comes with professional looking templates which can be customized further to match your brand style.
`;

function Preview() {
  return (
    <Slide
      inverted
      fromColor="#5691c8"
      toColor="#457fca"
      heading="Step 2. Customize"
      description={description}
      imgSrc={path.resolve(__dirname, './imgs/Preview.svg')}
      imgSize="520px"
    />
  );
}

export default Preview;
