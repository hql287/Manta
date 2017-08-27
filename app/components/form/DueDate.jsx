// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

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
    this.setState({focused: false});
  };

  onFocusChange = () => {
    this.setState({focused: !this.state.focused});
  };

  onDateChange = selectedDate => {
    let dueDate;
    if (selectedDate === null) {
      dueDate = null;
    } else {
      dueDate = moment(selectedDate).toObject();
    }
    const {dispatch} = this.props;
    const changeDueDate = bindActionCreators(
      ActionCreators.changeDueDate,
      dispatch,
    );
    changeDueDate(dueDate);
  };

  render = () => {
    const {dueDate} = this.props.currentInvoice;
    const date = dueDate ? moment(dueDate) : null;
    return (
      <div className="formSection">
        <label className="itemLabel">Due Date</label>
        <DueDateContent>
          <SingleDatePicker
            id="invoice-duedate"
            placeholder="Select A Date"
            firstDayOfWeek={1}
            displayFormat="DD/MM/YYYY"
            hideKeyboardShortcutsPanel={true}
            date={date}
            focused={this.state.focused}
            onFocusChange={() => this.onFocusChange()}
            onDateChange={date => this.onDateChange(date)}
          />
          <a href="#"
            className={ date === null ? "clearDateBtn" : "clearDateBtn active" }
            onClick={() => this.onDateChange(null)}>
            <i className="ion-close-circled"></i>
          </a>
        </DueDateContent>
      </div>
    );
  };
}

export default connect(state => ({
  currentInvoice: state.FormReducer,
}))(DueDate);
