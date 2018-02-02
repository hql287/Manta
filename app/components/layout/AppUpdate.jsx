// Libraries
import React, { PureComponent } from 'react';
import openDialog from '../../renderers/dialog';
import { Circle } from 'rc-progress';
import i18n from '../../../i18n/i18n';
import { Notify } from '../../../helpers/notify';
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
          title: i18n.t('dialog:appUpdate:available:title'),
          message: i18n.t('dialog:appUpdate:available:message'),
          buttons: [
            i18n.t('common:yes'),
            i18n.t('common:noThanks')
          ],
        },
        'update-download-confirmed'
      );
    });

    ipc.on('update-not-available', () => {
      openDialog({
        type: 'info',
        title: i18n.t('dialog:appUpdate:noUpdate:title'),
        message: i18n.t('dialog:appUpdate:noUpdate:message'),
      });
      this.hideIndicator();
    });

    ipc.on('update-error', (event, error) => {
      openDialog({
        type: 'warning',
        title: i18n.t('dialog:appUpdate:error:title'),
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
      // Send notification
      Notify({
        title: i18n.t('dialog:appUpdate:downloaded:title'),
        body: i18n.t('dialog:appUpdate:downloaded:message'),
      });
      // Open Dialog
      openDialog(
        {
          type: 'info',
          title: i18n.t('dialog:appUpdate:downloaded:title'),
          message: i18n.t('dialog:appUpdate:downloaded:message'),
          buttons: [
            i18n.t('dialog:appUpdate:downloaded:quitNow'),
            i18n.t('dialog:appUpdate:downloaded:later')
          ],
        },
        'upgrade-confirmed'
      );
      this.hideIndicator();
    });

    ipc.on('upgrade-confirmed', (event, index) => {
      if (index === 0) {
        ipc.send('quit-and-install');
      }
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
