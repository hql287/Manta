// Libs
import React, { Component } from 'react';
const openDialog = require('../../renderers/dialog');
import Message from './Message';
import styled from 'styled-components';
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #2C323A;
  h1 {
    font-size: 500%;
    color: #CBC189;
  }
  h2 {
    font-weight: 400;
    color: white;
  }
  p {
    margin: 0;
    font-weight: 100;
    color: #C4C8CC;
    line-height: 1.75;
    text-align: center;
  }
`;
import i18n from '../../../i18n/i18n';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    openDialog({
      type: 'warning',
      title: i18n.t('dialog:errorBoundary'),
      message: info.componentStack,
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h1>
            <i className='ion-bug' />
          </h1>
          <h2>You have found a bug!</h2>
          <p>
            Please report this to the maintainer of Manta.
            <br />
            GitHub: https://github.com/hql287/Manta
            <br />
            Email: hi@manta.life
          </p>
        </ErrorContainer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
