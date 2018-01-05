// Libraries
import React, { Component } from 'react';
const ipc = require('electron').ipcRenderer;
import openDialog from '../../renderers/dialog';

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
  ${props => props.type === 'error' && `background: #EC476E;`};
  ${props => props.type === 'success' && `background: #6BBB69;`};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  button {
    color: white;
  }
`;

import Button from '../../components/shared/Button';

class AppUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      type: 'info',
    };
  }

  componentDidMount() {
    ipc.on('update-checking', event => {
      this.setState({ message: 'Checking for update' });
    });

    ipc.on('update-available', () => {
      openDialog(
        {
          type: 'info',
          title: 'Update Available',
          message: 'Do you want to download update in the background now?',
          buttons: ['Yes', 'No'],
        },
        'update-download-confirmed'
      );
    });

    ipc.on('update-not-available', () => {
      openDialog({
        type: 'info',
        title: 'No Updates',
        message: 'Current version is up-to-date',
      });
      this.removeMessage();
    });

    ipc.on('update-error', (event, error) => {
      openDialog({
        type: 'warning',
        title: 'Update Error',
        message: error,
      });
      this.removeMessage();
    });

    ipc.on('update-download-confirmed', (event, index) => {
      // Start the download
      if (index === 0) {
        this.setState({
          message: 'Downloading update ...',
          type: 'success',
        });
        ipc.send('update-download-started');
      }
      // Cancel the download
      if (index === 1) {
        this.removeMessage();
      }
    });

    ipc.on('update-download-progress', (event, progressMessage) => {
      this.setState({
        message: progressMessage,
      });
    });

    ipc.on('update-downloaded', () => {
      // Update Message
      this.setState({
        message: 'Download Completed!',
      });
      // Ask user to upgrade now or later
      openDialog(
        {
          type: 'info',
          title: 'Update Downloaded',
          message: 'Do you want to quit the app to upgrade now?',
          buttons: ['Quit Now', 'Later'],
        },
        'upgrade-confirmed'
      );
    });

    ipc.on('upgrade-confirmed', (event, index) => {
      if (index === 0) {
        ipc.send('restart-app');
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  componentWillUnmount() {
    ipc.removeAllListeners([
      'update-checking',
      'update-available',
      'update-not-available',
      'update-error',
      'update-download-confirmed',
      'update-download-progress',
      'update-downloaded',
      'upgade-confirmed',
    ]);
  }

  removeMessage = () => {
    this.setState({
      message: null,
      type: 'info',
    });
  }

  render() {
    const { message, type } = this.state;
    return message ? (
      <Wrapper>
        <Content type={type}>
          <Message>{message}</Message>
          <Button link onClick={this.removeMessage}>
            <i className="ion-close" />
          </Button>
        </Content>
      </Wrapper>
    ) : null;
  }
}

export default AppUpdate;
