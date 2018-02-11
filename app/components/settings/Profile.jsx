// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Custom Component
import Logo from './_partials/profile/Logo';

const Hint = styled.p`
  margin: -15px 0 20px 0;
  font-size: 80%;
  color: grey;
`;

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
   const { t } = this.props;
    return (
      <div>
        <div className="pageItem">
          <label className="itemLabel">{t('settings:fields:logo:name')}</label>
          <Hint>{t('settings:fields:logo:hint')}</Hint>
          <Logo
            logo={this.state.logo}
            handleLogoChange={this.handleLogoChange}
          />
        </div>
        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">{t('common:fields:fullname')}</label>
            <input
              name="fullname"
              type="text"
              value={this.state.fullname}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">{t('common:fields:company')}</label>
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
            <label className="itemLabel">{t('common:fields:address')}</label>
            <input
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">{t('common:fields:email')}</label>
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
            <label className="itemLabel">{t('common:fields:phone')}</label>
            <input
              name="phone"
              type="text"
              value={this.state.phone}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">{t('common:fields:website')}</label>
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
  t: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(Profile);
