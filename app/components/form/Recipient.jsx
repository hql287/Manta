// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
import _ from 'lodash';

// Redux
import {connect} from 'react-redux';
import * as FormActions from '../../actions/form';
import * as ContactsActions from '../../actions/contacts';

// Custom Components
import RecipientForm from './RecipientForm';
import RecipientsList from './RecipientsList';
import { Section } from '../shared/Section';

// Component
class Recipient extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentInvoice.recipient;
    this.toggleForm = this.toggleForm.bind(this);
    this.updateRecipientForm = this.updateRecipientForm.bind(this);
    this.updateRecipientList = this.updateRecipientList.bind(this);
  }

  // Retrieve all contacts once the component is mounted
  componentDidMount() {
    if (!this.props.contacts.loaded) {
      const {dispatch} = this.props;
      dispatch(ContactsActions.getAllContacts());
    }
  }

  // Handle Reset Form
  componentWillReceiveProps(nextProps) {
    const { recipient } = nextProps.currentInvoice;
    if (_.isEmpty(recipient.new) && _.isEmpty(recipient.select)) {
      this.setState(
        Object.assign({}, this.state, {
          newRecipient: true,
          new: {},
          select: {},
        })
      );
    }
  }

  // Optimization
  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  // Switch between New Recipient Form or Selection Form
  toggleForm() {
    this.setState({ newRecipient: !this.state.newRecipient }, () => {
      this.updateRecipientData(this.state);
    });
  }

  // Hanlde Update Recipient Form Data
  updateRecipientForm(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      new: Object.assign({}, this.state.new, {[name]: value})
    }, () => {
      this.updateRecipientData(this.state);
    });
  }

  // Handle Update Recipient Selection Form
  updateRecipientList(selectedContact) {
    this.setState({ select: selectedContact }, () => {
      this.updateRecipientData(this.state);
    });
  }

  // Update Recipient Date to Current Invoice
  updateRecipientData(data) {
    const {dispatch} = this.props;
    dispatch(FormActions.updateRecipient(data));
  }

  // Render Form or Select Input
  renderComponent() {
    const { currentInvoice, contacts } = this.props;
    if (contacts.data.length === 0 ) {
      return (
        <RecipientForm
          formData={this.state.new}
          updateRecipientForm={this.updateRecipientForm}
        />
      );
    }

    if (this.state.newRecipient) {
      return(
        <RecipientForm
          formData={this.state.new}
          updateRecipientForm={this.updateRecipientForm}
        />
      );
    } else {
      return(
        <RecipientsList
          contacts={this.props.contacts.data}
          selectedContact={this.state.select}
          updateRecipientList={this.updateRecipientList}
        />
      );
    }
  }

  // Render
  render() {
    const { contacts } = this.props;
    return (
      <Section>
        <label className="itemLabel">Client *</label>
        { this.renderComponent() }
        { contacts.data.length > 0
          ? <div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    onChange={this.toggleForm}
                    checked={this.state.newRecipient === true}
                    value="new"
                  />
                  Add New
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    onChange={this.toggleForm}
                    checked={this.state.newRecipient === false}
                    value="select"
                  />
                  Select
                </label>
              </div>
            </div>
          : null}
      </Section>
    );
  };
}

// PropTypes Validation
Recipient.propTypes = {
  currentInvoice: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Map state to props & Export
export default connect(state => ({
  currentInvoice: state.FormReducer,
  contacts: state.ContactsReducer,
}))(Recipient);
