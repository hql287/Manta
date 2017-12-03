import React from 'react';
import path from 'path';
import Slide from '../Slide';

const description = `
  Thank you for giving me a try. Let me show you how to create stunning invoices with just 3 simple steps.
`;

function Welcome() {
  return (
    <Slide
      inverted
      fromColor="#CAD2E8"
      toColor="#6979A4"
      heading="👋  Hello!"
      description={description}
      imgSrc={path.resolve(__dirname, './imgs/Welcome.svg')}
      imgSize="475px"
    />
  );
}

export default Welcome;
