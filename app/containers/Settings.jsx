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

  state = { visibleTab: 1 };

  componentDidMount = () => {
    if (!this.props.settings.loaded) {
      const {dispatch} = this.props;
      const getInitalSettings = bindActionCreators(
        ActionCreators.getInitalSettings,
        dispatch,
      );
      getInitalSettings();
    }
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

  // Update Setting
  updateSettings = (setting, data) => {
    const {dispatch} = this.props;
    const updateSettings = bindActionCreators(ActionCreators.updateSettings, dispatch);
    updateSettings(setting, data);
  };

  // Switch Tab
  changeTab = tabNum => {
    this.setState({visibleTab: tabNum});
  };

  // Render Main Content
  renderSettingsContent = () => {
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
              <Info
                info={info}
                updateSettings={this.updateSettings} />}
            {this.state.visibleTab === 2 &&
              <PrintOptions
                printOptions={printOptions}
                updateSettings={this.updateSettings} />}
            {this.state.visibleTab === 3 &&
              <AppSettings
                appSettings={appSettings}
                updateSettings={this.updateSettings} />}
          </TabContent>
        </PageContent>
      </PageWrapper>
    );
  }

  render = () => {
    return (
      this.props.settings.loaded
      ? this.renderSettingsContent()
      : null
    );
  }
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
