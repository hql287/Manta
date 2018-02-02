// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import { Section } from '../shared/Section';

// React Dates
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

// Styles
import styled from 'styled-components';
const DueDateContent = styled.div`
  display: flex;
`;

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
export class DueDate extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.clearDate = this.clearDate.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState || this.props.dueDate != nextProps.dueDate;
  }

  onFocusChange() {
    this.setState({ focused: !this.state.focused });
  }

  onDateChange(date) {
    const selectedDate = date === null ? null : moment(date).toObject();
    this.props.updateFieldData('dueDate', { selectedDate });
  }

  clearDate() {
    this.onDateChange(null);
  }

  render() {
    const { t, dueDate } = this.props;
    const selectedDate = dueDate.selectedDate
      ? moment(dueDate.selectedDate)
      : null;
    return (
      <Section>
        <label className="itemLabel">{t('form:fields:dueDate:name')}</label>
        <DueDateContent>
          <SingleDatePicker
            id="invoice-duedate"
            placeholder={t('form:fields:dueDate:placeHolder')}
            firstDayOfWeek={1}
            withFullScreenPortal
            displayFormat="DD/MM/YYYY"
            hideKeyboardShortcutsPanel
            date={selectedDate}
            focused={this.state.focused}
            onFocusChange={this.onFocusChange}
            onDateChange={newDate => this.onDateChange(newDate)}
          />
          {selectedDate !== null && (
            <a
              className="clearDateBtn active"
              href="#"
              onClick={this.clearDate}
            >
              <i className="ion-close-circled" />
            </a>
          )}
        </DueDateContent>
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
