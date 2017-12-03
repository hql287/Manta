import React from 'react';
import path from 'path';
import Slide from '../Slide';

const description = `
Manta has a flexible form interface. It keeps things simple by default but you can always turn on/off additional fields whenever you find necessary.
`;

console.log('__dirname: ', __dirname);

function Create() {
  return (
    <Slide
      fromColor="#85E5A9"
      toColor="#26BB86"
      heading="Step 1. Create"
      description={description}
      imgSrc={path.resolve(__dirname, './imgs/Create.svg')}
      imgSize="350px"
    />
  );
}

export default Create;
