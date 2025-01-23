// Libraries
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// React Dates
import { SingleDatePicker } from 'react-dates';

// Styles
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

// Component
export class DueDatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { focused: false };
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.clearDate = this.clearDate.bind(this);
  }

  onFocusChange() {
    this.setState({ focused: !this.state.focused });
  }

  onDateChange(date) {
    const selectedDate = date === null ? null : moment(date).toObject();
    this.props.updateCustomDate(selectedDate);
  }

  clearDate() {
    this.onDateChange(null);
  }

  render() {
    const { t, selectedDate } = this.props;
    const dueDate = selectedDate === null ? null : moment(selectedDate);
    return (
      <Container>
        <SingleDatePicker
          id="invoice-duedate"
          placeholder={t('form:fields:dueDate:placeHolder')}
          firstDayOfWeek={1}
          withFullScreenPortal
          displayFormat="DD/MM/YYYY"
          hideKeyboardShortcutsPanel
          date={dueDate}
          focused={this.state.focused}
          onFocusChange={this.onFocusChange}
          onDateChange={newDate => this.onDateChange(newDate)}
        />
        {selectedDate !== null && (
          <a className="clearDateBtn active" href="#" onClick={this.clearDate}>
            <i className="ion-close-circled" />
          </a>
        )}
      </Container>
    );
  }
}

DueDatePicker.propTypes = {
  selectedDate: PropTypes.object,
  t: PropTypes.func.isRequired,
  updateCustomDate: PropTypes.func.isRequired,
};

DueDatePicker.defaultProps = {
  selectedDate: null,
};

// Export
export default _withFadeInAnimation(DueDatePicker);
