// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import { TR, TD } from '../shared/Table';
import Button from '../shared/Button';

// Component
class Contact extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteContact = this.deleteContact.bind(this);
    this.newInvoice = this.newInvoice.bind(this);
  }

  newInvoice() {
    const { newInvoice, contact } = this.props;
    newInvoice(contact);
  }

  deleteContact() {
    const { contact, deleteContact } = this.props;
    deleteContact(contact._id);
  }

  render() {
    const { contact } = this.props;
    return (
      <TR>
        <TD bold>{contact.fullname}</TD>
        <TD>{contact.email}</TD>
        <TD>{contact.phone}</TD>
        <TD actions>
          <Button link primary onClick={this.newInvoice}>
            <i className="ion-plus-round" />
          </Button>
          <Button link danger onClick={this.deleteContact}>
            <i className="ion-close-circled" />
          </Button>
        </TD>
      </TR>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
  newInvoice: PropTypes.func.isRequired,
};

export default Contact;
