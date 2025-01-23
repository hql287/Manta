import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 40px;
  background: #f9fafa;
  ${props => `
    background: -webkit-linear-gradient(to bottom, ${props.fromColor}, ${
    props.toColor
  });
    background: linear-gradient(to bottom, ${props.fromColor}, ${
    props.toColor
  });
  `} > * {
    flex: 1;
  }
`;

const Image = styled.img`
  ${props =>
    props.size &&
    `
    max-width: ${props.size};
  `};
`;

const Header = styled.h1`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Text = styled.div`
  padding-top: 20px;
  text-align: center;
  ${props =>
    props.inverted &&
    `
    color: white;
  `};
`;

const Description = styled.p`
  max-width: 80%;
  margin: 0 auto 20px auto;
`;

function Slide(props) {
  const {
    inverted,
    heading,
    description,
    imgSrc,
    imgSize,
    fromColor,
    toColor,
  } = props;
  return (
    <Wrapper fromColor={fromColor} toColor={toColor}>
      <Text inverted={inverted}>
        <Header>{heading}</Header>
        <Description>{description}</Description>
      </Text>
      <Image size={imgSize} src={imgSrc} />
    </Wrapper>
  );
}

Slide.propTypes = {
  description: PropTypes.string.isRequired,
  fromColor: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  imgSize: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  inverted: PropTypes.bool,
  toColor: PropTypes.string.isRequired,
};

Slide.defaultProps = {
  imgSize: '400px',
  inverted: false,
};

export default Slide;
