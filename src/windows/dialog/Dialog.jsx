// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
const appConfig = require('electron').remote.require('electron-settings');
const BrowserWindow = require('electron').remote.BrowserWindow;
const ipc = require('electron').ipcRenderer;
const mainWindow = BrowserWindow.fromId(appConfig.get('mainWindowID'));

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background: #f7f7f9;
`;

const Type = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  padding-top: 10px;
  i {
    font-size: 42px;
  }
  ${props =>
    props.type === 'warning' &&
    `
    i { color: #f0ad4e; }
  `} ${props =>
      props.type === 'info' &&
      `
    i { color: #0275d8; }
  `};
`;

const Container = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 2;
  width: 100%;
`;

const Title = styled.h4`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0;
  ${props =>
    props.type === 'warning' &&
    `
    color: #f0ad4e;
  `} ${props =>
      props.type === 'info' &&
      `
    color: #0275d8;
  `};
`;

const Message = styled.p`
  color: #464a4c;
  text-align: center;
  padding: 0 40px;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  ${props =>
    props.type === 'warning' &&
    `
    border-top: 4px solid #f0ad4e;
  `} ${props =>
      props.type === 'info' &&
      `
    border-top: 4px solid #0275d8;
  `} a {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 5px 30px;
    border-radius: 4px;
    color: #464a4c;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    margin: 0 5px;
    -moz-transition: all 0.1s ease-in;
    -o-transition: all 0.1s ease-in;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
    &:hover {
      text-decoration: none;
      background: rgb(2, 117, 216);
      color: white;
    }
  }
`;

// Component
class Dialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    ipc.on('update-modal', (e, dialogOptions, returnChannel, ...rest) => {
      this.setState({
        returnChannel,
        ...dialogOptions,
        rest: [...rest],
      });
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners('update-modal');
  }

  handleClick(event) {
    // Get index of buttons
    const index = event.target.getAttribute('alt');
    const { rest, returnChannel } = this.state;
    // Only send IPC back if there's a channel present
    if (returnChannel !== '') {
      mainWindow.send(returnChannel, parseInt(index), ...rest);
    }
    // Close the windows
    BrowserWindow.getFocusedWindow().close();
  }

  renderIconClass() {
    switch (this.state.type) {
      case 'info': {
        return 'ion-alert';
      }
      case 'warning': {
        return 'ion-alert-circled';
      }
      default: {
        return 'ion-information-circled';
      }
    }
  }

  rendersButtons() {
    if (!this.state.buttons) {
      return (
        <a href="#" onClick={this.handleClick}>
          Ok
        </a>
      );
    }
    return this.state.buttons.map((button, index) => (
      <a href="#" key={index} alt={index} onClick={this.handleClick}>
        {button}
      </a>
    ));
  }

  render() {
    const { type } = this.state;
    return type !== undefined ? (
      <Wrapper>
        <Type type={type}>
          <i className={this.renderIconClass()} />
        </Type>
        <Content>
          <Title type={type}>{this.state.title}</Title>
          <Message>{this.state.message}</Message>
        </Content>
        <Actions type={type}>{this.rendersButtons()}</Actions>
      </Wrapper>
    ) : null;
  }
}

export default Dialog;
