// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
const openDialog = require('../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;

// Actions
import * as ContactsActions from '../actions/contacts';
import * as InvoicesActions from '../actions/invoices';

// Components
import Contact from '../components/contacts/Contact';
import Message from '../components/shared/Message';
import { Table, THead, TBody, TH, TR } from '../components/shared/Table';
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from '../components/shared/Layout';

// Selectors
import { getContacts } from '../reducers/ContactsReducer';

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
    return this.props !== nextProps;
  }

  componentWillUnmount() {
    ipc.removeAllListeners('confirmed-delete-contact');
  }

  newInvoice(contact) {
    const { dispatch } = this.props;
    dispatch(InvoicesActions.newInvoiceFromContact(contact));
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
    const { dispatch } = this.props;
    dispatch(ContactsActions.deleteContact(contactId));
  }

  render() {
    const { contacts } = this.props;
    const contactsComponent = contacts.map((contact, index) => (
      <Contact
        key={contact._id}
        contact={contact}
        index={index}
        deleteContact={this.deleteContact}
        newInvoice={this.newInvoice}
      />
    ));
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>All Contacts</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          {contacts.length === 0 ? (
            <Message info text="You don't have any contacts yet!" />
          ) : (
            <Table hasBorders bg>
              <THead>
                <TR>
                  <TH>Contact</TH>
                  <TH>Email</TH>
                  <TH>Phone</TH>
                  <TH actions>Actions</TH>
                </TR>
              </THead>
              <TBody>{contactsComponent}</TBody>
            </Table>
          )}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes
Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Map state to props & Export
const mapStateToProps = state => ({
  contacts: getContacts(state),
});

export default compose(connect(mapStateToProps), _withFadeInAnimation)(
  Contacts
);
