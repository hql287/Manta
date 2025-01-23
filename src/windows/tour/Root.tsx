// Libs
import React, { useState } from 'react'
//import { ipcRenderer as ipc } from 'electron'
//import { useTranslation } from 'react-i18next';
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

// Components
import { Slider } from './containers/Slider'
import { Actions } from './components/Actions'

export const Root = () => {
  //const { t } = useTranslation(['common', 'tour']);
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlide = 5

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1)
  }

  const endTour = () => {
    setCurrentSlide(1)
    window.electronAPI.endTour()
  }

  return (
    <Wrapper>
      <Slider
        //t={t}
        currentSlide={currentSlide}
      />

      <Actions
        //t={t}
        totalSlide={totalSlide}
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        endTour={endTour}
      />
    </Wrapper>
  )
}
