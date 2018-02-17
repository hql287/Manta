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
              <label className="itemLabel">{t('settings:fields:sound')}</label>
              <select
                name="sound"
                value={this.state.sound}
                onChange={this.handleInputChange}
              >
                <option value="default">{t('common:default')}</option>
                <option value="cs">Counter Strike</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:fields:mute')}</label>
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
              <label className="itemLabel">{t('settings:fields:autoCheckUpdate:name')}</label>
              <select
                name="checkUpdate"
                value={this.state.checkUpdate}
                onChange={this.handleInputChange}
              >
                <option value="daily">{t('settings:fields:autoCheckUpdate:daily')}</option>
                <option value="weekly">{t('settings:fields:autoCheckUpdate:weekly')}</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{t('settings:fields:openPDFReader')}</label>
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
              <label className="itemLabel">{t('settings:fields:language:name')}</label>
              <select
                name="language"
                value={this.state.language}
                onChange={this.handleInputChange}
              >
                <option value="en">{t('settings:fields:language:en')}</option>
                <option value="ko">{t('settings:fields:language:ko')}</option>
                <option value="vi">{t('settings:fields:language:vi')}</option>
                <option value="zh-CN">{t('settings:fields:language:zh-CN')}</option>
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
  t: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(General);
