// Libraries
import React, {Component} from 'react';

// Custom Components
import Switch from '../shared/Switch';
import {Section} from '../shared/Section';

// React Dates
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';

// Styles
import styled from 'styled-components';
const DueDateContent = styled.div`display: flex;`;

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class DueDate extends Component {
  componentWillMount = () => {
    this.setState({focused: false});
  };

  onFocusChange = () => {
    this.setState({focused: !this.state.focused});
  };

  onDateChange = date => {
    const selectedDate = date === null ? null : moment(date).toObject();
    this.props.updateFieldData('dueDate', selectedDate);
  };

  render = () => {
    const {dueDate, toggleField} = this.props;
    const selectedDate = dueDate.selectedDate
      ? moment(dueDate.selectedDate)
      : null;
    return (
      <Section>
        <label className="itemLabel">Due Date</label>
        <DueDateContent>
          <SingleDatePicker
            id="invoice-duedate"
            placeholder="Select A Date"
            firstDayOfWeek={1}
            withFullScreenPortal={true}
            displayFormat="DD/MM/YYYY"
            hideKeyboardShortcutsPanel={true}
            date={selectedDate}
            focused={this.state.focused}
            onFocusChange={() => this.onFocusChange()}
            onDateChange={newDate => this.onDateChange(newDate)}
          />
          <a
            href="#"
            className={
              selectedDate === null ? 'clearDateBtn' : 'clearDateBtn active'
            }
            onClick={() => this.onDateChange(null)}>
            <i className="ion-close-circled" />
          </a>
        </DueDateContent>
      </Section>
    );
  };
}

// Export
export default _withFadeInAnimation(DueDate);
