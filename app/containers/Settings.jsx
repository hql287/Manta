// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { translate } from 'react-i18next';

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
    this.state = { visibleTab: 1, canSave: true };
    this.saveSettingsState = this.saveSettingsState.bind(this);
    this.setSavable = this.setSavable.bind(this);
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

  // controls if save button appears
  setSavable(settingsValid) {
    this.setState({canSave: settingsValid});
  }

  // Render Main Content
  renderSettingsContent() {
    const { t } = this.props;
    const { updateSettings } = this.props.boundActionCreators;
    const { profile, general, invoice } = this.props.currentSettings;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>{t('settings:header')}</PageHeaderTitle>
          {!this.settingsSaved() && this.state.canSave && (
            <PageHeaderActions>
              <Button primary onClick={this.saveSettingsState}>
                {t('common:save')}
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
              {t('settings:tabs:profile')}
            </Tab>
            <Tab
              href="#"
              className={this.state.visibleTab === 2 ? 'active' : ''}
              onClick={() => this.changeTab(2)}
            >
              {t('settings:tabs:invoice')}
            </Tab>
            <Tab
              href="#"
              className={this.state.visibleTab === 3 ? 'active' : ''}
              onClick={() => this.changeTab(3)}
            >
              {t('settings:tabs:general')}
            </Tab>
          </Tabs>
          <TabContent>
            {this.state.visibleTab === 1 && (
              <Profile t={t} profile={profile} updateSettings={updateSettings} setSavable={this.setSavable} />
            )}
            {this.state.visibleTab === 2 && (
              <Invoice t={t} invoice={invoice} updateSettings={updateSettings} setSavable={this.setSavable} />
            )}
            {this.state.visibleTab === 3 && (
              <General t={t} general={general} updateSettings={updateSettings} setSavable={this.setSavable} />
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
  translate(),
  _withFadeInAnimation
)(Settings);
