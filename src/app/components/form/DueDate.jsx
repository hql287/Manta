// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import { Section } from '../shared/Section';
import DueDatePicker from './DueDatePicker';
import DueDateTerms from './DueDateTerms';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
export class DueDate extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.dueDate;
    this.toggleDatePicker = this.toggleDatePicker.bind(this);
    this.updateCustomDate = this.updateCustomDate.bind(this);
    this.updatePaymentTerm = this.updatePaymentTerm.bind(this);
    this.updateDueDate = this.updateDueDate.bind(this);
  }

  // Handle Clear Form
  componentWillReceiveProps(nextProps) {
    const { selectedDate, paymentTerm, useCustom } = nextProps.dueDate;
    if (selectedDate === null && paymentTerm === null && useCustom === true) {
      this.setState(nextProps.dueDate);
    }
  }

  toggleDatePicker() {
    this.setState({ useCustom: !this.state.useCustom }, () => {
      this.updateDueDate(this.state);
    });
  }

  updateCustomDate(selectedDate) {
    this.setState({ selectedDate }, () => {
      this.updateDueDate(this.state);
    });
  }

  updatePaymentTerm(paymentTerm) {
    this.setState({ paymentTerm }, () => {
      this.updateDueDate(this.state);
    });
  }

  updateDueDate(data) {
    this.props.updateFieldData('dueDate', data);
  }

  render() {
    const { t } = this.props;
    const { selectedDate, paymentTerm } = this.state;
    return (
      <Section>
        <label className="itemLabel">{t('form:fields:dueDate:name')}</label>
        {this.state.useCustom ? (
          <DueDatePicker
            t={t}
            selectedDate={selectedDate}
            updateCustomDate={this.updateCustomDate}
          />
        ) : (
          <DueDateTerms
            t={t}
            paymentTerm={paymentTerm}
            updatePaymentTerm={this.updatePaymentTerm}
          />
        )}
        <div>
          <div className="radio">
            <label>
              <input
                type="radio"
                onChange={this.toggleDatePicker}
                checked={this.state.useCustom === true}
                value="new"
              />
              Custom Date
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                onChange={this.toggleDatePicker}
                checked={this.state.useCustom === false}
                value="select"
              />
              Select Payment Term
            </label>
          </div>
        </div>
      </Section>
    );
  }
}

DueDate.propTypes = {
  dueDate: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateFieldData: PropTypes.func.isRequired,
};

// Export
export default _withFadeInAnimation(DueDate);
