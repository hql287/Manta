// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
const MessageStyle = styled.div`
  padding: 20px;
  font-weight: 200;
  color: #4f555c;
  background: #f9fafa;
  ${props => props.info && `border-left: 5px solid #469FE5;`}
  ${props => props.success && `border-left: 5px solid #6BBB69;`}
  ${props => props.danger && `border-left: 5px solid #EC476E;`}
  ${props => props.warning && `border-left: 5px solid #F9D548;`}
`;

// Component
const Message = props => {
  return (
    <MessageStyle {...props}>
      {props.text}
    </MessageStyle>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
