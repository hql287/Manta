import React from 'react';
import path from 'path';
import Slide from '../Slide';

const description = `
Manta has a simple yet flexible form interface. It keeps things simple by default but remember you can always toggle additional fields when needed.
`;

console.log('__dirname: ', __dirname);

function Create() {
  return (
    <Slide
      fromColor="#85E5A9"
      toColor="#26BB86"
      heading="1. Create"
      description={description}
      imgSrc={path.resolve(__dirname, './imgs/Create.svg')}
      imgSize="350px"
    />
  );
}

export default Create;
