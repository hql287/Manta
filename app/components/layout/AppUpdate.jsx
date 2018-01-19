// Libraries
import React, { PureComponent } from 'react';
import openDialog from '../../renderers/dialog';
import { Circle } from 'rc-progress';
const ipc = require('electron').ipcRenderer

// Styled Components
import styled, { keyframes } from 'styled-components';

const breathing = keyframes`
  0% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  color: #f2f3f4;
  i {
    font-size: 24px;
    animation: ${breathing} 1s infinite alternate;
  }
  svg {
    width: 24px;
    height: 24px;
  }
`;

class AppUpdate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checking: false,
      downloading: false,
      progress: null,
    };
    this.hideIndicator = this.hideIndicator.bind(this);
  }

  componentDidMount() {
    ipc.on('update-checking', () => {
      this.setState({ checking: true });
    });

    ipc.on('update-available', () => {
      this.hideIndicator();
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
      this.hideIndicator();
    });

    ipc.on('update-error', (event, error) => {
      openDialog({
        type: 'warning',
        title: 'Update Error',
        message: error,
      });
      this.hideIndicator();
    });

    ipc.on('update-download-confirmed', (event, index) => {
      // Cancel the download
      if (index === 1) {
        this.hideIndicator();
        return;
      }
      // Start the download
      if (index === 0) {
        this.setState(
          {
            downloading: true,
          },
          ipc.send('update-download-started')
        );
      }
    });

    ipc.on('update-download-progress', (event, percentage) => {
      this.setState({
        progress: percentage,
      });
    });

    ipc.on('update-downloaded', () => {
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
        ipc.send('quit-and-upgrade');
      }
      this.hideIndicator();
    });
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

  hideIndicator() {
    this.setState({
      checking: false,
      downloading: false,
      progress: null,
    });
  }

  render() {
    return (
      <Indicator>
        {this.state.checking && <i className="ion-cloud" />}
        {this.state.downloading && (
          <Circle
            percent={this.state.progress}
            strokeWidth={16}
            trailWidth={16}
            trailColor="#4F555C"
            strokeColor="#469FE5"
          />
        )}
      </Indicator>
    );
  }
}

export default AppUpdate;
