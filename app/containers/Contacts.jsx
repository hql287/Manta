// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
const openDialog = require('../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;

import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import * as TRANSLATION_LABELS from '../constants/translations';

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
class Contacts extends PureComponent {
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
        title: this.props.translate(TRANSLATION_LABELS.CONTACTS_DLG_DELETE_TITLE),
        message: this.props.translate(TRANSLATION_LABELS.CONTACTS_DLG_DELETE_SURE),
        buttons: [this.props.translate(TRANSLATION_LABELS.CONTACTS_DLG_DELETE_BTN_YES), this.props.translate(TRANSLATION_LABELS.CONTACTS_DLG_DELETE_BTN_NO)],
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
          <PageHeaderTitle>{ this.props.translate(TRANSLATION_LABELS.CONTACTS_HEADING) }</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          {contacts.length === 0 ? (
            <Message info text={ this.props.translate(TRANSLATION_LABELS.CONTACTS_MSG_NOCONTACTS) } />
          ) : (
            <Table hasBorders bg>
              <THead>
                <TR>
                  <TH>{ this.props.translate(TRANSLATION_LABELS.CONTACTS_TBLHEADER_CONTACT) }</TH>
                  <TH>{ this.props.translate(TRANSLATION_LABELS.CONTACTS_TBLHEADER_EMAIL) }</TH>
                  <TH>{ this.props.translate(TRANSLATION_LABELS.CONTACTS_TBLHEADER_PHONE) }</TH>
                  <TH actions>{ this.props.translate(TRANSLATION_LABELS.CONTACTS_TBLHEADER_ACTIONS) }</TH>
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
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};

// Map state to props & Export
const mapStateToProps = state => ({
  contacts: getContacts(state),
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code,
});

export default compose(connect(mapStateToProps), _withFadeInAnimation)(
  Contacts
);
