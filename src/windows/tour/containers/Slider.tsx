import React from 'react'
import styled from 'styled-components'
import Save from '../components/slides/Save' // Save PDF & Send
import Create from '../components/slides/Create' // Explains how Form works
import Welcome from '../components/slides/Welcome' // Welcome Slide
import Preview from '../components/slides/Preview' // Preview & Customize Template
import Success from '../components/slides/Success' // Success

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`

interface SliderProps {
  //t: (key: string) => string
  currentSlide: number
}

export const Slider: React.FC<SliderProps> = ({ currentSlide }) => {
  return (
    <Content>
      {currentSlide === 1 && <Welcome />}
      {currentSlide === 2 && <Create />}
      {currentSlide === 3 && <Preview />}
      {currentSlide === 4 && <Save />}
      {currentSlide === 5 && <Success />}
    </Content>
  )
}
