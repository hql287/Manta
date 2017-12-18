// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const ButtonStyle = styled.button`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 4px 15px;
  font-size: 12px;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,.1);
  text-transform: uppercase;
  letter-spacing: 1px;
  ${props => props.block && `width: 100%;`}
  ${props => props.primary && `
    background: #469fe5;
    color: white;
  `}
  ${props => props.success && `
    background: #6bbb69;
    color: white;
  `}
  ${props => props.danger && `
    background: #EC476E;
    color: white;
  `}
  &:hover {
    cursor: pointer;
    // color: white;
    text-decoration: none;
  }
`;

const ButtonLinkStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  ${props => props.primary && `color: #469fe5;`}
  ${props => props.success && `color: #6bbb69;`}
  ${props => props.danger && `color: #EC476E;`}
  &:hover { cursor: pointer; }
`;

function Button(props) {
  return props.link
    ? <ButtonLinkStyle {...props}>
        {props.children}
      </ButtonLinkStyle>
    : <ButtonStyle {...props}>
        {props.children}
      </ButtonStyle>;
}

Button.propTypes = {
  link: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  success: PropTypes.bool,
};

Button.defaultProps = {
  link: false,
  primary: false,
  success: false,
  danger: false,
};

export default Button;
