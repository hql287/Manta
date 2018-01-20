// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Custom Component
import Logo from './_partials/Logo';
const Hint = styled.p`
  margin: -15px 0 20px 0;
  font-size: 80%;
  color: grey;
`;

import * as TRANSLATION_LABELS from '../../constants/translations';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.profile;
    this.handleLogoChange = this.handleLogoChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.props.updateSettings('profile', this.state);
    });
  }

  handleLogoChange(base64String) {
    this.setState({ logo: base64String }, () => {
      this.updateProfileState();
    });
  }

  updateProfileState() {
    this.props.updateSettings('profile', this.state);
  }

  render() {
    return (
      <div>
        <div className="pageItem">
          <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_LOGO) }</label>
          <Hint>{ this.props.translate(TRANSLATION_LABELS.SETTING_LOGO_HINT) }</Hint>
          <Logo
            logo={this.state.logo}
            handleLogoChange={this.handleLogoChange}
            translate={this.props.translate}
          />
        </div>
        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_FULLNAME) }</label>
            <input
              name="fullname"
              type="text"
              value={this.state.fullname}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_COMPANY) }</label>
            <input
              name="company"
              type="text"
              value={this.state.company}
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_ADDRESS) }</label>
            <input
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_EMAIL) }</label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_PHONE) }</label>
            <input
              name="phone"
              type="text"
              value={this.state.phone}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.SETTINGS_WEBSITE) }</label>
            <input
              name="website"
              type="text"
              value={this.state.website}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};

export default _withFadeInAnimation(Profile);
