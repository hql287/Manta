// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

// Selectors
import {
  getCurrentSettings,
  getSavedSettings,
} from '../reducers/SettingsReducer';

// Actions
import * as Actions from '../actions/settings';
import { bindActionCreators } from 'redux';

// Components
import Profile from '../components/settings/Profile';
import General from '../components/settings/General';
import Invoice from '../components/settings/Invoice';
import Button from '../components/shared/Button';
import { Tab, Tabs, TabContent } from '../components/shared/Tabs';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../components/shared/Layout';
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Component
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleTab: 1 };
    this.saveSettingsState = this.saveSettingsState.bind(this);
  }

  // Check if settings have been saved
  settingsSaved() {
    const { currentSettings, savedSettings } = this.props;
    return isEqual(currentSettings, savedSettings);
  }

  // Save Settings to App Config
  saveSettingsState() {
    const { currentSettings, boundActionCreators } = this.props;
    boundActionCreators.saveSettings(currentSettings);
  }

  // Switch Tab
  changeTab(tabNum) {
    this.setState({ visibleTab: tabNum });
  }

  // Render Main Content
  renderSettingsContent() {
    const { profile, general, invoice } = this.props.currentSettings;
    const { updateSettings } = this.props.boundActionCreators;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Settings</PageHeaderTitle>
          {!this.settingsSaved() && (
            <PageHeaderActions>
              <Button primary onClick={this.saveSettingsState}>
                Save
              </Button>
            </PageHeaderActions>
          )}
        </PageHeader>
        <PageContent>
          <Tabs>
            <Tab
              href="#"
              className={this.state.visibleTab === 1 ? 'active' : ''}
              onClick={() => this.changeTab(1)}
            >
              Profile
            </Tab>
            <Tab
              href="#"
              className={this.state.visibleTab === 2 ? 'active' : ''}
              onClick={() => this.changeTab(2)}
            >
              Invoice
            </Tab>
            <Tab
              href="#"
              className={this.state.visibleTab === 3 ? 'active' : ''}
              onClick={() => this.changeTab(3)}
            >
              General
            </Tab>
          </Tabs>
          <TabContent>
            {this.state.visibleTab === 1 && (
              <Profile profile={profile} updateSettings={updateSettings} />
            )}
            {this.state.visibleTab === 2 && (
              <Invoice invoice={invoice} updateSettings={updateSettings} />
            )}
            {this.state.visibleTab === 3 && (
              <General general={general} updateSettings={updateSettings} />
            )}
          </TabContent>
        </PageContent>
      </PageWrapper>
    );
  }

  render() {
    return this.props.currentSettings ? this.renderSettingsContent() : null;
  }
}

// PropTypes Validation
Settings.propTypes = {
  boundActionCreators: PropTypes.shape({
    getInitalSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    saveSettings: PropTypes.func.isRequired,
  }).isRequired,
  currentSettings: PropTypes.object.isRequired,
  savedSettings: PropTypes.object.isRequired,
};

// Map State & Dispatch to Props & Export
const mapDispatchToProps = dispatch => ({
  boundActionCreators: bindActionCreators(Actions, dispatch),
});

const mapStateToProps = state => ({
  currentSettings: getCurrentSettings(state),
  savedSettings: getSavedSettings(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  _withFadeInAnimation
)(Settings);
