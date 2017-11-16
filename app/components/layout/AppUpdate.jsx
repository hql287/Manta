// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
const Wrapper = styled.div`
  position: fixed;
  height: auto;
  bottom: 0;
  width: 100%;
  padding-left: 120px;
  padding-right: 40px;
`;

const Message = styled.p`
  font-size: 12px;
  letter-spacing: 0.5px;
  color: white;
  margin-bottom: 0px;
  line-height: 1.75;
`;

const Content = styled.div`
  background: #469fe5;
  border-radius: 4px 4px 0 0;
  padding: 10px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  ${props =>
    props.type === 'error' &&
    `
    background: #EC476E;
  `};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  button { color: white;}
`;

import Button from '../../components/shared/Button';

function AppUpdate({message, removeMessage}) {
  return message.content ? (
    <Wrapper>
      <Content type={message.type}>
        <Message>{message.content}</Message>
        <Button link onClick={removeMessage}>
          <i className="ion-close"/>
        </Button>
      </Content>
    </Wrapper>
  ) : null;
}

AppUpdate.propTypes = {
  message: PropTypes.object,
  removeMessage: PropTypes.func.isRequired,
};

export default AppUpdate;
