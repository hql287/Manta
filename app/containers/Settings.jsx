// Libraries
import React, {Component} from 'react';
const appConfig = require('electron').remote.require('electron-settings');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../actions/settings.jsx';

// Components
import Info from '../components/settings/Info.jsx';

// Component
class Settings extends Component {
  state = {
    saved: true,
  };

  // Update Info Settings
  updateInfo = data => {
    const {dispatch} = this.props;
    const updateRow = bindActionCreators(ActionCreators.updateInfo, dispatch);
    updateRow({info: data});
    this.setState({saved: false});
  };

  // Save Settings to App Config
  saveSettingsState = () => {
    const {dispatch} = this.props;
    const saveSettings = bindActionCreators(
      ActionCreators.saveSettings,
      dispatch,
    );
    saveSettings(this.props.settings);
    this.setState({saved: true});
  };

  render = () => {
    const {info} = this.props.settings;
    return (
      <div className="pageWrapper">
        <div className="pageHeader">
          <h4>Settings</h4>
        </div>
        <div className="pageContent">
          <Info info={info} updateInfo={this.updateInfo} />
        </div>
        <div className="pageFooter">
          {!this.state.saved &&
            <a href="#" onClick={() => this.saveSettingsState()}>
              Save Settings
            </a>}
        </div>
      </div>
    );
  };
}

export default connect(state => ({
  settings: state.SettingsReducer,
}))(Settings);
