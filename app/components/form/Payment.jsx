import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

// Custom Components
import { Section, Header } from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
const PaymentContent = styled.textarea`
  min-height: 36px;
  border-radius: 4px;
  padding: 10px;
  display: block;
  width: 100%;
  border: 1px solid #f2f3f4;
  color: #3a3e42;
  font-size: 14px;
`;

// Component
export class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = props.payment;
    this.isSettingsSaved = this.isSettingsSaved.bind(this);
    this.saveAsDefault = this.saveAsDefault.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.payment.details === undefined) {
      this.setState({ details: '' }, () => {
        this.props.updateFieldData('payment', this.state);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) return true;
    if (this.props.payment.details !== nextProps.payment.details) return true;
    return false;
  }

  handleInputChange(event) {
    this.setState({ details: event.target.value }, () => {
      this.props.updateFieldData('payment', this.state);
    });
  }

  isSettingsSaved() {
    return isEqual(this.state, this.props.savedSettings);
  }

  saveAsDefault() {
    const { updateSavedSettings } = this.props;
    updateSavedSettings('payment', this.state);
  }

  render() {
    const { t } = this.props;
    return (
      <Section>
        <Header>
          <label className="itemLabel">{t('form:fields:payment:details')}</label>
          {!this.isSettingsSaved() && (
            <a href="#" onClick={this.saveAsDefault}>
              <i className="ion-checkmark" /> {t('common:saveAsDefault')}
            </a>
          )}
        </Header>
        <PaymentContent
          cols="50"
          rows="4"
          onChange={this.handleInputChange}
          value={this.state.details}
          placeholder={t('form:fields:payment:description')}
        />
      </Section>
    );
  }
}

Payment.propTypes = {
  payment: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateFieldData: PropTypes.func.isRequired,
};

// Export
export default _withFadeInAnimation(Payment);
