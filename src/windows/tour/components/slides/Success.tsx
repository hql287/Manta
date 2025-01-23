import React from 'react'
import Slide from '../Slide'

const Success: React.FC = () => {
  return (
    <Slide
      fromColor="#85E5A9"
      toColor="#26BB86"
      heading="Heading"
      //heading={t('tour:slides:create:heading')}
      description='Create a new form by clicking the "Create Form" button.'
      //description={t('tour:slides:create:description')}
      imgSrc="../../imgs/Success.svg" // Pass the SVG as a React component
      imgSize="350px"
    />
  )
}

export default Success
