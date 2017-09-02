// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form';

// React Dates
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';

// Styles
import styled from 'styled-components';
const DueDateContent = styled.div`
  display: flex;
`;

// Component
class DueDate extends Component {

  componentWillMount = () => {
    this.setState({ focused: false });
  };

  onFocusChange = () => {
    this.setState({focused: !this.state.focused});
  };

  onDateChange = date => {
    const selectedDate = date === null ? null : moment(date).toObject();
    const {dispatch} = this.props;
    const changeDueDate = bindActionCreators(
      ActionCreators.changeDueDate,
      dispatch,
    );
    changeDueDate(selectedDate);
  };

  render = () => {
    const {dueDate} = this.props.currentInvoice;
    const selectedDate = dueDate.selectedDate ? moment(dueDate.selectedDate) : null;
    return (
      <div className="formSection">
        <label className="itemLabel">
          Due Date
        </label>
        <label className="switch">
          <input
            name="required"
            type="checkbox"
            checked={dueDate.required}
            onChange={() => this.props.toggleField('dueDate')}
          />
          <span className="slider round"></span>
        </label>
        { dueDate.required &&
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
            <a href="#"
              className={ selectedDate === null ? "clearDateBtn" : "clearDateBtn active" }
              onClick={() => this.onDateChange(null)}>
              <i className="ion-close-circled"></i>
            </a>
          </DueDateContent>}
      </div>
    );
  };
}

export default connect(state => ({ currentInvoice: state.FormReducer }))(DueDate);
