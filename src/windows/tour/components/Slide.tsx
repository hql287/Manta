import React, { FC } from 'react'
import styled from 'styled-components'

interface SlideProps {
  description: string
  fromColor: string
  heading: string
  imgSize?: string
  imgSrc: string
  inverted?: boolean
  toColor: string
}

const Wrapper = styled.div<{ fromColor: string; toColor: string }>`
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 40px;
  background: #f9fafa;
  ${(props) => `
    background: -webkit-linear-gradient(to bottom, ${props.fromColor}, ${props.toColor});
    background: linear-gradient(to bottom, ${props.fromColor}, ${props.toColor});
  `} > * {
    flex: 1;
  }
`

const Image = styled.img<{ size?: string }>`
  ${(props) =>
    props.size &&
    `
    max-width: ${props.size};
  `}
`

const Header = styled.h1`
  margin-top: 30px;
  margin-bottom: 20px;
`

const Text = styled.div<{ inverted?: boolean }>`
  padding-top: 20px;
  text-align: center;
  ${(props) =>
    props.inverted &&
    `
    color: white;
  `}
`

const Description = styled.p`
  max-width: 80%;
  margin: 0 auto 20px auto;
`

const Slide: FC<SlideProps> = ({
  inverted,
  heading,
  description,
  imgSrc,
  imgSize,
  fromColor,
  toColor,
}) => {
  return (
    <Wrapper fromColor={fromColor} toColor={toColor}>
      <Text inverted={inverted}>
        <Header>{heading}</Header>
        <Description>{description}</Description>
      </Text>
      <Image size={imgSize} src={imgSrc} />
    </Wrapper>
  )
}

export default Slide
