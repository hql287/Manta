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
  static propTypes = {
    recipients: PropTypes.array.isRequired,
  };

  componentWillMount = () => {
    if (this.props.recipients.length > 0) {
      this.setState({type: 'select'});
    } else {
      this.setState({type: 'new'});
    }
  };

  toggleForm = event => {
    this.setState({
      type: event.target.value,
    });
  };

  updateRecipient = data => {
    const {dispatch} = this.props;
    const updateRecipient = bindActionCreators(
      FormActionCreators.updateRecipient,
      dispatch,
    );
    updateRecipient(data);
  };

  outputComponent = () => {
    const {currentReceipt, recipients} = this.props;
    // If No contact existed, show the contact form
    if (recipients.length === 0) {
      return (
        <RecipientForm
          currentRecipientData={currentReceipt.recipient.new}
          updateRecipient={this.updateRecipient}
        />
      );
    }
    // If there are contacts
    // Show New or Select Form depends on state
    if (this.state.type === 'new') {
      return (
        <RecipientForm
          currentRecipientData={currentReceipt.recipient.new}
          updateRecipient={this.updateRecipient}
        />
      );
    } else {
      return (
        <RecipientsList
          currentSelectedRecipient={currentReceipt.recipient.select}
          recipients={recipients}
          updateRecipient={this.updateRecipient}
        />
      );
    }
  };

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
                  checked={type === 'select'}
                  value="select"
                />
                Select
              </label>
            </div>
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
          </div>}
      </div>
    );
  };
}

export default connect(state => ({
  currentReceipt: state.FormReducer,
}))(Recipient);
