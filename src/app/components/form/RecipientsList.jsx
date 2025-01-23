// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
import { isEmpty, findIndex } from 'lodash';

// Animation
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
const List = styled.div`
  margin-bottom: 20px;
`;

// Component
export class RecipientsList extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    const { contacts, selectedContact } = this.props;
    if (isEmpty(selectedContact)) {
      this.updateSelectedRecipient(contacts[0]._id);
    }
  }

  handleInputChange(event) {
    this.updateSelectedRecipient(event.target.value);
  }

  updateSelectedRecipient(selectedContactId) {
    const { contacts, updateRecipientList } = this.props;
    // Find selected Contact in Contacts Array via ID
    const contactIndex = findIndex(contacts, { _id: selectedContactId });
    const selectedContact = contacts[contactIndex];
    // Send update to parent Component
    updateRecipientList(selectedContact);
  }

  render() {
    const { contacts, selectedContact } = this.props;
    const optionsComponent = contacts.map(contact => (
      <option key={contact._id} value={contact._id}>
        {contact.fullname ? contact.fullname : contact.company}
        ( {contact.email})
      </option>
    ));
    return (
      <List>
        <select
          onChange={this.handleInputChange}
          value={selectedContact._id ? selectedContact._id : contacts[0]._id}
        >
          {optionsComponent}
        </select>
      </List>
    );
  }
}

// PropTypes Validation
RecipientsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  selectedContact: PropTypes.object.isRequired,
  updateRecipientList: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(RecipientsList);
