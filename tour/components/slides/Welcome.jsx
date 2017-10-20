import React from 'react';
import path from 'path';
import Slide from '../Slide';

const description = `
Welcome and thank you for taking the time to try this out. Now, let's learn how you can use Manta to create stunning invoices in under a minute with these 3 simple steps.
`;

function Welcome() {
  return (
    <Slide
      inverted
      fromColor="#CAD2E8"
      toColor="#6979A4"
      heading="👋  Hello!"
      description={description}
      imgSrc={path.resolve(__dirname, '../../imgs/Welcome.svg')}
      imgSize="475px"
    />
  );
}

export default Welcome;
