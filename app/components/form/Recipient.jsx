// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as FormActionCreators from '../../actions/form.jsx';

// Custom Components
import RecipientForm from './RecipientForm.jsx';
import RecipientsList from './RecipientsList.jsx';

// Component
class Recipient extends Component {
  // Extract data from redux set as state before mount
  componentWillMount = () => {
    const {recipient} = this.props.currentReceipt;
    switch (recipient.type) {
      case 'new': {
        this.setState({
          type: 'new',
          new: recipient.new,
          select: recipient.select,
        });
        break;
      }
      case 'select': {
        this.setState({
          type: 'select',
          new: recipient.new,
          select: recipient.select,
        });
        break;
      }

      // If there is no existing data
      default: {
        if (this.props.recipients.length > 0) {
          this.setState({
            type: 'select',
            new: {},
            select: {},
          });
        } else {
          this.setState({
            type: 'new',
            new: {},
            select: {},
          });
        }
      }
    }
  };

  // Toggle Recipient Form
  toggleForm = event => {
    this.setState({ type: event.target.value }, () => {
      this.dispatchRecipientData(this.state);
    });
  };

  // Update Local Recipient State Data
  updateRecipientState = data => {
    this.setState(data, () => {
      this.dispatchRecipientData(this.state);
    });
  };

  // Send Recipient State Data to Store
  dispatchRecipientData = data => {
    const {dispatch} = this.props;
    const dispatchRecipientData = bindActionCreators(
      FormActionCreators.updateRecipient,
      dispatch,
    );
    dispatchRecipientData(data);
  };

  // Output Form or List
  outputComponent = () => {
    // If No contact existed, show the contact form
    const {recipients} = this.props;
    const { type } = this.props.currentReceipt.recipient;
    if (recipients.length === 0) {
      return (
        <RecipientForm
          currentRecipientData={this.state.new}
          updateRecipientState={this.updateRecipientState}
          clearState={type === null ? true : false}
        />
      );
    }
    // If there are contacts
    // Show New or Select Form depends on state
    if (this.state.type === 'new') {
      return (
        <RecipientForm
          currentRecipientData={this.state.new}
          updateRecipientState={this.updateRecipientState}
          clearState={type === null ? true : false}
        />
      );
    } else {
      return (
        <RecipientsList
          recipients={recipients}
          currentSelectedRecipient={this.state.select}
          updateRecipientState={this.updateRecipientState}
          clearState={type === null ? true : false}
        />
      );
    }
  };

  // Render
  render = () => {
    const {type} = this.state;
    const {recipients} = this.props;
    return (
      <div className="recipientWrapper">
        <label className="itemLabel">Recipient</label>
        {this.outputComponent()}
        {recipients.length > 0 &&
          <div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  onChange={e => this.toggleForm(e)}
                  checked={type === 'new'}
                  value="new"
                />
                Add New
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  onChange={e => this.toggleForm(e)}
                  checked={type === 'select'}
                  value="select"
                />
                Select
              </label>
            </div>
          </div>}
      </div>
    );
  };
}

Recipient.propTypes = {
  recipients: PropTypes.array.isRequired,
};

export default connect(state => ({
  currentReceipt: state.FormReducer,
}))(Recipient);
