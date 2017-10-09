import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const Image = styled.img`
  max-width: 400px;
  max-height: 200px;
  height: 100%;
  width: auto;
  margin-bottom: 100px;
`;

const Header = styled.h1`
  text-transform: uppercase;
  font-size: 21px;
  letter-spacing: 1px;
`;

const Description = styled.p`

`;

const Aux = props => props.children;

function Slide({imgSrc, header, description}) {
  return (
    <Aux>
      <Image src={imgSrc} />
      <Header>{header}</Header>
      <Description>{description}</Description>
    </Aux>
  );
}

Slide.propTypes = {
  description: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default Slide;
