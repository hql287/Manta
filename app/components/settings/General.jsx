// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Libs
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

import * as TRANSLATION_LABELS from '../../constants/translations';

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
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_SOUND) }</label>
              <select
                name="sound"
                value={this.state.sound}
                onChange={this.handleInputChange}
              >
                <option value="default">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_SOUND_DEFAULT) }</option>
                <option value="cs">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_SOUND_CS) }</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_SOUND_MUTE) }</label>
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
              <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_UPDATE_AUTOCHECK) }</label>
              <select
                name="checkUpdate"
                value={this.state.checkUpdate}
                onChange={this.handleInputChange}
              >
                <option value="daily">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_UPDATE_EVERYDAY) }</option>
                <option value="weekly">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_UPDATE_WEEK) }</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_AUTOPREVIEWPDF) }</label>
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
      </div>
    );
  }
}

General.propTypes = {
  general: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};

export default _withFadeInAnimation(General);
