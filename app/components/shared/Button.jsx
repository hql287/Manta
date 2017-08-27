// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
const Button = styled.a`
  font-size: 12px;
  color: white;
  border-radius: 4px;
  padding: 5px 10px;
  border: none;
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  background: #292B2C;
  ${props => props.primary && `background: #469fe5;`}
  ${props => props.success && `background: #6bbb69;`}
  ${props => props.danger && `background: #EC476E;`}
`;

export const ButtonWrapper = props => {
  const { href, onClick, children, primary, success, danger } = props;
  return (
    <Button
      href={href}
      primary={ primary ? true : false }
      success={ success ? true : false }
      danger={ danger ? true : false }
      onClick={onClick}>
      { children }
    </Button>
  );
}

ButtonWrapper.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  success: PropTypes.bool,
  danger: PropTypes.bool,
};

ButtonWrapper.defaultProps = {
  href: '#',
  primary: false,
  success: false,
  danger: false,
}

export default ButtonWrapper;
