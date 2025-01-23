import React, { FC } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../../../app/components/shared/Button'

const Content = styled.div`
  flex: 1;
  max-height: 80px;
  background: #f9fafa;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-around;
  display: flex;
  align-items: center;
  > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Dot = styled.div<{ active?: boolean }>`
  height: 6px;
  width: 6px;
  background: #c4c8cc;
  margin: 0 4px;
  border-radius: 10px;
  ${(props) =>
    props.active &&
    `
    background: #c80000;
  `}
`

interface ActionsProps {
  //t: (key: string) => string
  endTour: () => void
  nextSlide: () => void
  currentSlide: number
  totalSlide: number
}

export const Actions: FC<ActionsProps> = ({
  //t,
  endTour,
  nextSlide,
  currentSlide,
  totalSlide,
}) => {
  const indicators = []
  for (let i = 0; i < totalSlide; i++) {
    indicators.push(<Dot key={uuidv4()} active={i + 1 === currentSlide} />)
  }

  return (
    <Content>
      <div>
        {currentSlide < totalSlide && (
          <Button link danger onClick={endTour}>
            Skip
          </Button>
        )}
      </div>

      <div>
        {currentSlide === totalSlide ? (
          <Button success onClick={endTour}>
            Start
          </Button>
        ) : (
          indicators
        )}
      </div>

      <div>
        {currentSlide < totalSlide && (
          <Button primary onClick={nextSlide}>
            Next
          </Button>
        )}
      </div>
    </Content>
  )
}

//{t('tour:actions:start')}
//{t('tour:actions:skip')}
//{t('tour:actions:next')}
