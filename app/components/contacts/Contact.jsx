// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Components
import {TR, TD} from '../shared/Table';
import Button from '../shared/Button';

// Component
class Contact extends Component {
  constructor(props) {
    super(props);
    this.deleteContact = this.deleteContact.bind(this);
    this.newInvoice = this.newInvoice.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data._id !== nextProps.data._id;
  }

  newInvoice() {
    const {newInvoice, data} = this.props;
    newInvoice(data);
  }

  deleteContact() {
    const {data, deleteContact} = this.props;
    deleteContact(data._id);
  }

  render() {
    const contact = this.props.data;
    return (
      <TR>
        <TD bold>
          {contact.fullname}
        </TD>
        <TD>
          {contact.email}
        </TD>
        <TD>
          {contact.phone}
        </TD>
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
  data: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
  newInvoice: PropTypes.func.isRequired,
};

export default Contact;
