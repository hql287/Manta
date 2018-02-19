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
    this.state = { focused: false, addDay:0 };
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.clearDate = this.clearDate.bind(this);
    this.change = this.change.bind(this);
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
    this.setState({addDay: 0});
  }

  clearDate() {
    this.onDateChange(null);
  }

  change(event){
    let result = new Date();
    result = result.setDate(result.getDate() + parseFloat(event.target.value));
    const selectedDate = moment(result).toObject();
    this.onDateChange(selectedDate);
    this.setState({ addDay: event.target.value});
    this.props.updateFieldData('dueDate', this.state);
  }

  render() {

    const { t, dueDate } = this.props;
    const selectedDate = dueDate.selectedDate
      ? moment(dueDate.selectedDate)
      : null;
    const days =  [7,10,30,60,90];
    const daysList = days.map(day => <option value={day}>{t('form:fields:dueDate:addDayNet')} {day} {t('form:fields:dueDate:addDaysToCurrentDate')}</option>);
    return (
      <Section>
        <label className="itemLabel">{t('form:fields:dueDate:name')}</label>
        <DueDateContent>
          <select name="addDay" id="addDay" placeholder={t('form:fields:dueDate:placeHolder')} onChange={this.change} value={this.state.addDay} >
            <option value="0">{t('form:fields:dueDate:addSomeDaysToCurrentDate')}</option>
            {daysList}
          </select>

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
