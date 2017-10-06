// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux & Selectors
import {getContacts} from '../../reducers/ContactsReducer';
import {getRecipient} from '../../reducers/FormReducer';
import {connect} from 'react-redux';
import * as FormActions from '../../actions/form';

// Other Libs
import _ from 'lodash';

// Custom Components
import RecipientForm from './RecipientForm';
import RecipientsList from './RecipientsList';
import {Section} from '../shared/Section';

// Component
export class Recipient extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.recipient;
    this.toggleForm = this.toggleForm.bind(this);
    this.updateRecipientForm = this.updateRecipientForm.bind(this);
    this.updateRecipientList = this.updateRecipientList.bind(this);
  }

  // Handle Reset Form
  componentWillReceiveProps(nextProps) {
    const {recipient} = nextProps;
    if (
      _.isEmpty(recipient.new) &&
      _.isEmpty(recipient.select) &&
      recipient.newRecipient === true
    ) {
      this.setState(
        Object.assign({}, this.state, {
          newRecipient: true,
          new: {},
          select: {},
        }),
      );
    }
  }

  // Optimization
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  // Switch between New Recipient Form or Selection Form
  toggleForm() {
    this.setState({newRecipient: !this.state.newRecipient}, () => {
      this.updateRecipientData(this.state);
    });
  }

  // Hanlde Update Recipient Form Data
  updateRecipientForm(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(
      {
        new: Object.assign({}, this.state.new, {[name]: value}),
      },
      () => {
        this.updateRecipientData(this.state);
      },
    );
  }

  // Handle Update Recipient Selection Form
  updateRecipientList(selectedContact) {
    this.setState({select: selectedContact}, () => {
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
    const {contacts} = this.props;
    if (contacts.length === 0) {
      return (
        <RecipientForm
          formData={this.state.new}
          updateRecipientForm={this.updateRecipientForm}
        />
      );
    }

    if (this.state.newRecipient) {
      return (
        <RecipientForm
          formData={this.state.new}
          updateRecipientForm={this.updateRecipientForm}
        />
      );
    } else {
      return (
        <RecipientsList
          contacts={this.props.contacts}
          selectedContact={this.state.select}
          updateRecipientList={this.updateRecipientList}
        />
      );
    }
  }

  // Render
  render() {
    const {contacts} = this.props;
    return (
      <Section>
        <label className="itemLabel">Client *</label>
        {this.renderComponent()}
        {contacts.length > 0 ? (
          <div>
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
        ) : null}
      </Section>
    );
  }
}

// PropTypes Validation
Recipient.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    newRecipient: PropTypes.bool.isRequired,
    select: PropTypes.object.isRequired,
    new: PropTypes.object.isRequired,
  }).isRequired,
};

// Map state to props & Export
const mapStateToProps = state => ({
  contacts: getContacts(state),
  recipient: getRecipient(state),
});

export default connect(mapStateToProps)(Recipient);
