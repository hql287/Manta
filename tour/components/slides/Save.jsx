import React from 'react';
import path from 'path';
import Slide from '../Slide';

const description = `
  Once happy with the invoice appearance your can save it as PDF for later use. Print it out or email it, let's use Manta to impress your clients now!
`;

function Save() {
  return (
    <Slide
      inverted
      fromColor="#E52D27"
      toColor="#B31217"
      heading="3. Save"
      description={description}
      imgSrc={path.resolve(__dirname, '../../imgs/Save.svg')}
      imgSize="360px"
    />
  );
}

export default Save;
