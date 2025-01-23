// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
const openDialog = require('../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;
import { translate } from 'react-i18next';

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
    const { t } = this.props;
    openDialog(
      {
        type: 'warning',
        title: t('dialog:deleteContact:title'),
        message: t('dialog:deleteContact:message'),
        buttons: [
          t('common:yes'),
          t('common:noThanks')
        ],
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
    const { t, contacts } = this.props;
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
          <PageHeaderTitle>{t('contacts:header')}</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          {contacts.length === 0 ? (
            <Message info text={t('messages:noContact')} />
          ) : (
            <Table hasBorders bg>
              <THead>
                <TR>
                  <TH>{t('contacts:fields:contact')}</TH>
                  <TH>{t('contacts:fields:email')}</TH>
                  <TH>{t('contacts:fields:phone')}</TH>
                  <TH actions>{t('contacts:fields:actions')}</TH>
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

export default compose(
  connect(mapStateToProps),
  translate(),
  _withFadeInAnimation
)(Contacts);
