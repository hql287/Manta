// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {compose} from 'recompose';
import {connect} from 'react-redux';
import * as Actions from '../actions/settings';

// 3rd Party Libs
const _ = require('lodash');

// Layout
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../components/shared/Layout';

// Animation
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Components
import Info from '../components/settings/Info';
import AppSettings from '../components/settings/AppSettings';
import PrintOptions from '../components/settings/PrintOptions';
import Button from '../components/shared/Button';
import {
  Tab,
  Tabs,
  TabContent,
} from '../components/shared/Tabs';

// Component
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleTab: 1 };
    this.saveSettingsState = this.saveSettingsState.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

  componentDidMount() {
    if (!this.props.settings.loaded) {
      const {dispatch} = this.props;
      dispatch(Actions.getInitalSettings());
    }
  }

  // Check if settings have been saved
  settingsSaved() {
    const {current, saved} = this.props.settings;
    return _.isEqual(current, saved);
  }

  // Save Settings to App Config
  saveSettingsState() {
    const {dispatch, settings} = this.props;
    dispatch(Actions.saveSettings(settings.current));
  }

  // Update Setting
  updateSettings(setting, data) {
    const {dispatch} = this.props;
    dispatch(Actions.updateSettings(setting, data));
  }

  // Switch Tab
  changeTab(tabNum) {
    this.setState({visibleTab: tabNum});
  }

  // Render Main Content
  renderSettingsContent() {
    const {info, appSettings, printOptions} = this.props.settings.current;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Settings</PageHeaderTitle>
          {!this.settingsSaved() &&
            <PageHeaderActions>
              <Button primary onClick={this.saveSettingsState}>
                Save
              </Button>
          </PageHeaderActions>}
        </PageHeader>
        <PageContent>
          <Tabs>
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
          </Tabs>
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

  render() {
    return (
      this.props.settings.loaded
      ? this.renderSettingsContent()
      : null
    );
  }
}

// PropTypes Validation
Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    current: PropTypes.object,
    loaded: PropTypes.bool.isRequired,
    save: PropTypes.object,
  }).isRequired,
};

// Export
export default compose(
  connect(state => ({ settings: state.SettingsReducer })),
  _withFadeInAnimation
)(Settings);
