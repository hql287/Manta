// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const ButtonStyle = styled.button`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 4px 15px;
  font-size: 12px;
  text-decoration: none;
  color: white;
  background: #292B2C;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${props => props.primary && `background: #469fe5;`}
  ${props => props.success && `background: #6bbb69;`}
  ${props => props.danger && `background: #EC476E;`}
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

function Button(props) {
  return (
    <ButtonStyle {...props}>
      { props.children }
    </ButtonStyle>
  );
}

Button.propTypes = {
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  success: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
  success: false,
  danger: false,
};

export default Button;
