import React from 'react'
import Slide from '../Slide'

const Welcome: React.FC = () => {
  return (
    <Slide
      inverted
      fromColor="#CAD2E8"
      toColor="#6979A4"
      heading="Welcome header!"
      //heading={t('tour:slides:welcome:heading')} // Assuming `t` is globally available
      description="Welcome to the tour!"
      // description={t('tour:slides:welcome:description')} // Uncomment this line if dynamic translation is needed
      imgSrc="./imgs/Welcome.svg" // Pass the SVG as a React component
      imgSize="475px"
    />
  )
}

export default Welcome
