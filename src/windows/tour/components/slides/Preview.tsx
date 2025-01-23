import React from 'react'
import Slide from '../Slide'

const description = `
`

const Preview: React.FC = () => {
  return (
    <Slide
      inverted
      fromColor="#5691c8"
      toColor="#457fca"
      heading="Preview & Customize Template"
      description="Preview and customize your template before saving it as a PDF."
      //heading={t('tour:slides:preview:heading')}
      //description={t('tour:slides:preview:description')}
      imgSrc="../../imgs/Preview.svg" // Pass the SVG as a React component
      imgSize="520px"
    />
  )
}

export default Preview
