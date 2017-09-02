// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../actions/settings';

// 3rd Party Libs
const _ = require('lodash');

// Layout
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
  PageFooter,
  } from '../components/shared/Layout';

// Animation
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Components
import Info from '../components/settings/Info';
import AppSettings from '../components/settings/AppSettings';
import PrintOptions from '../components/settings/PrintOptions';
import Message from '../components/shared/Message';
import Button from '../components/shared/Button';
import {
  TabsWrapper,
  TabContent,
  Tab,
  } from '../components/shared/Tabs';

// Component
class Settings extends Component {
  componentWillMount = () => {
    this.setState({  visibleTab: 1  });
  }

  // Check if settings have been saved
  settingsSaved = () => {
    const {current, saved} = this.props.settings;
    return _.isEqual(current, saved);
  };

  // Save Settings to App Config
  saveSettingsState = () => {
    // Dispatch Action
    const {dispatch} = this.props;
    const saveSettings = bindActionCreators(
      ActionCreators.saveSettings,
      dispatch,
    );
    saveSettings(this.props.settings.current);
  };

  // Update Info Settings
  updateInfo = data => {
    const {dispatch} = this.props;
    const updateInfo = bindActionCreators(ActionCreators.updateInfo, dispatch);
    updateInfo(data);
  };

  // Update App Settings
  updateAppSettings = data => {
    const {dispatch} = this.props;
    const updateAppSettings = bindActionCreators(
      ActionCreators.updateAppSettings,
      dispatch,
    );
    updateAppSettings(data);
  };

  // Update Print Options
  updatePrintOptions = data => {
    const {dispatch} = this.props;
    const updatePrintOptions = bindActionCreators(
      ActionCreators.updatePrintOptions,
      dispatch,
    );
    updatePrintOptions(data);
  }

  // Switch Tab
  changeTab = tabNum => {
    this.setState({visibleTab: tabNum});
  };

  render = () => {
    const {info, appSettings, printOptions} = this.props.settings.current;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Settings</PageHeaderTitle>
          {!this.settingsSaved() &&
            <PageHeaderActions>
              <Button primary onClick={() => this.saveSettingsState()}>
                Save
              </Button>
          </PageHeaderActions>}
        </PageHeader>
        <PageContent>
          <TabsWrapper>
            <Tab
              href="#"
              className={this.state.visibleTab === 1 ? 'active' : ''}
              onClick={() => this.changeTab(1)}>
              Profile
            </Tab>
            <Tab
              href="#"
              className={this.state.visibleTab === 2 ? 'active' : ''}
              onClick={() => this.changeTab(2)}>
              Print Options
            </Tab>
            <Tab
              href="#"
              className={this.state.visibleTab === 3 ? 'active' : ''}
              onClick={() => this.changeTab(3)}>
              App Settings
            </Tab>
          </TabsWrapper>
          <TabContent>
            {this.state.visibleTab === 1 &&
              <Info info={info} updateInfo={this.updateInfo} />}
            {this.state.visibleTab === 2 &&
                <PrintOptions
                  printOptions={printOptions}
                  updatePrintOptions={this.updatePrintOptions} />}
            {this.state.visibleTab === 3 &&
              <AppSettings
                appSettings={appSettings}
                updateAppSettings={this.updateAppSettings}
              />}
          </TabContent>
        </PageContent>
      </PageWrapper>
    );
  };
}

// PropTypes Validation
Settings.propTypes = {
  settings: PropTypes.object.isRequired,
};

// Map state to props & Added Faded In Animation
Settings = connect(state => ({ settings: state.SettingsReducer }))(Settings);
Settings = _withFadeInAnimation(Settings);

// Export
export default Settings;
