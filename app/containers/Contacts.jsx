// Electron libs
const ipc = require('electron').ipcRenderer;

// Custom Libs
const openDialog = require('../renderers/dialog.js');

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {compose} from 'recompose';
import {connect} from 'react-redux';
import * as Actions from '../actions/contacts';

// Custom Components
import Contact from '../components/contacts/Contact';
import Message from '../components/shared/Message';
import {Table, THead, TBody, TH, TR} from '../components/shared/Table';

// Layout
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from '../components/shared/Layout';

// Animation
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Component
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentDidMount() {
    // Get All Contacts
    if (!this.props.contacts.loaded) {
      const {dispatch} = this.props;
      dispatch(Actions.getAllContacts());
    }

    // Add Event Listener
    ipc.on('confirmed-delete-contact', (event, index, contactId) => {
      if (index === 0) {
        this.confirmedDeleteContact(contactId);
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.contacts !== nextProps.contacts;
  }

  componentWillUnmount() {
    ipc.removeAllListeners('confirmed-delete-contact');
  }

  deleteContact(contactId) {
    openDialog(
      {
        type: 'warning',
        title: 'Delete This Contact',
        message: 'Are You Sure?',
        buttons: ['Yes', 'No'],
      },
      'confirmed-delete-contact',
      contactId
    );
  }

  confirmedDeleteContact(contactId) {
    const {dispatch} = this.props;
    dispatch(Actions.deleteContact(contactId));
  }

  render() {
    const {contacts} = this.props;
    const contactsComponent = contacts.data.map((contact, index) => {
      return (
        <Contact
          key={contact._id}
          data={contact}
          index={index}
          deleteContact={this.deleteContact}
        />
      );
    });
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>All Contacts</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          {contacts.data.length === 0
            ? <Message info text="You don't have any contacts yet!" />
            : <Table hasBorders bg>
                <THead>
                  <TR>
                    <TH>Contact</TH>
                    <TH>Phone</TH>
                    <TH>Email</TH>
                    <TH actions>Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {contactsComponent}
                </TBody>
              </Table>}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes
Contacts.propTypes = {
  contacts: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    data: PropTypes.array,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Export
export default compose(
  connect(state => ({ contacts: state.ContactsReducer })),
  _withFadeInAnimation
)(Contacts);
