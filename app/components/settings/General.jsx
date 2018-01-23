// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Libs
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class General extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.setState(this.props.general);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value }, () => {
      this.props.updateSettings('general', this.state);
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:general:sound:heading')}</label>
              <select
                name="sound"
                value={this.state.sound}
                onChange={this.handleInputChange}
              >
                <option value="default">{t('settings:general:sound:default')}</option>
                <option value="cs">{t('settings:general:sound:counterstrike')}</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:general:sound:mute')}</label>
              <label className="switch">
                <input
                  name="muted"
                  type="checkbox"
                  checked={this.state.muted}
                  onChange={this.handleInputChange}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:general:checkupdates:heading')}</label>
              <select
                name="checkUpdate"
                value={this.state.checkUpdate}
                onChange={this.handleInputChange}
              >
                <option value="daily">{t('settings:general:checkupdates:daily')}</option>
                <option value="weekly">{t('settings:general:checkupdates:weekly')}</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:general:autopreviewpdf')}</label>
              <label className="switch">
                <input
                  name="previewPDF"
                  type="checkbox"
                  checked={this.state.previewPDF}
                  onChange={this.handleInputChange}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:general:language:heading')}</label>
              <select
                name="language"
                value={this.state.language}
                onChange={this.handleInputChange}
              >
                <option value="en">{t('settings:general:language:english')}</option>
                <option value="de">{t('settings:general:language:german')}</option>
                <option value="fr">{t('settings:general:language:french')}</option>
                <option value="vi">{t('settings:general:language:vietnamese')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

General.propTypes = {
  general: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(General);
