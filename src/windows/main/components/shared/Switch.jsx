// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const SwitchStyle = styled.label`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
  margin: 0;
`;

const Input = styled.input`
  display: none;
  &:checked + span {
    background-color: #6bbb69;
  }
  &:checked + span:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #c4c8cc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  &::before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  ${props =>
    props.rounded &&
    `
    border-radius: 34px;
    &::before {
      border-radius: 50%;
    }
  `};
`;

export const Switch = props => (
  <SwitchStyle>
    <Input type="checkbox" {...props} />
    <Slider rounded />
  </SwitchStyle>
);

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Switch;
