// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
const openDialog = require('../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;

// Actions
import * as ContactsActions from '../actions/contacts';
import * as InvoicesActions from '../actions/invoices';

// Components
import Contact from '../components/contacts/Contact';
import Message from '../components/shared/Message';
import {Table, THead, TBody, TH, TR} from '../components/shared/Table';
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from '../components/shared/Layout';

// Component
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.newInvoice = this.newInvoice.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentDidMount() {
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

  newInvoice(contact) {
    const {dispatch} = this.props;
    dispatch(InvoicesActions.newInvocieFromContact(contact));
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
    dispatch(ContactsActions.deleteContact(contactId));
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
          newInvoice={this.newInvoice}
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
