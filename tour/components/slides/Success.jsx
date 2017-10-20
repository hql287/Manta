import React from 'react';
import path from 'path';
import Slide from '../Slide';

const description = `
There you have it, the 3 simple steps to create stunning invoices with Manta. Remember to update company profile and logo before actually using the invoice.
`;

function Success() {
  return (
    <Slide
      fromColor="#FFFFFF"
      toColor="#ECE9E6"
      heading=" Done!!! ✋️"
      description={description}
      imgSrc={path.resolve(__dirname, '../../imgs/Success.svg')}
      imgSize="425px"
    />
  );
}

export default Success;
