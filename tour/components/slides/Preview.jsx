import React from 'react';
import path from 'path';
import Slide from '../Slide';

const description = `
Preview your invoice with the beautiful templates built in to Manta. If necessary, you can always cutomize it further to match your brand style.
`;

function Preview() {
  return (
    <Slide
      fromColor="#FFD200"
      toColor="#F7971E"
      heading="2. Preview"
      description={description}
      imgSrc={path.resolve(__dirname, './imgs/Preview.svg')}
      imgSize="520px"
    />
  );
}

export default Preview;
