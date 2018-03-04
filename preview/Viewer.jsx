// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Notify } from '../helpers/notify';
import { connect } from 'react-redux';
import { compose } from 'recompose';
const ipc = require('electron').ipcRenderer;

// Style
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

// Components
import SideBar from './containers/SideBar';
import MainContent from './containers/MainContent';

// Actions
import * as ActionsCreator from './actions';

// Selectors
import { getConfigs, getInvoice, getProfile, getUILang } from './reducers';

// Components
class Viewer extends Component {
  constructor(props) {
    super(props);
    this.updateConfigs = this.updateConfigs.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    ipc.on('update-preview', (event, invoiceData) => {
      dispatch(ActionsCreator.updateInvoice(invoiceData));
    });
    ipc.on('change-preview-window-language', (event, newLang) => {
      dispatch(ActionsCreator.changeUILanguage(newLang));
    });
    ipc.on('change-preview-window-profile', (event, newProfile) => {
      dispatch(ActionsCreator.updateProfile(newProfile));
    });

    ipc.on('pfd-exported', (event, options) => {
      const noti = Notify(options);
      // Handle click on notification
      noti.onclick = () => {
        ipc.send('reveal-file', options.location);
      };
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners([
      'pfd-exported',
      'update-preview',
      'update-preview-window',
    ]);
  }

  updateConfigs(config) {
    const { dispatch } = this.props;
    dispatch(
      ActionsCreator.updateConfigs({ name: config.name, value: config.value })
    );
  }

  render() {
    const {  t, invoice, configs, profile, UILang } = this.props;
    return (
      <Wrapper>
        <SideBar
          UILang={UILang}
          configs={configs}
          invoice={invoice}
          updateConfigs={this.updateConfigs}
          t={t}
        />
        <MainContent
          invoice={invoice}
          configs={configs}
          profile={profile}
          UILang={UILang}
          t={t}
        />
      </Wrapper>
    );
  }
}

Viewer.propTypes = {
  configs: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  configs: getConfigs(state),
  invoice: getInvoice(state),
  profile: getProfile(state),
  UILang: getUILang(state),
});

export default compose(
  connect(mapStateToProps),
  translate()
)(Viewer);
