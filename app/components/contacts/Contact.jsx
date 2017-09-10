// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Components
import { TR, TD } from '../shared/Table';

// Component
class Contact extends Component {
  constructor(props) {
    super(props);
    this.deleteContact = this.deleteContact.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data._id !== nextProps.data._id;
  }

  deleteContact() {
    const { data, deleteContact } = this.props;
    deleteContact(data._id);
  }

  render() {
    const contact = this.props.data;
    return (
      <TR>
        <TD primary>
          {contact.fullname}
        </TD>
        <TD>
          {contact.email}
        </TD>
        <TD>
          {contact.phone}
        </TD>
        <TD actions>
          <a href="#" onClick={this.viewFullInfo}>
            <i className="ion-android-search" />
          </a>
          <a href="#" onClick={this.deleteContact}>
            <i className="ion-android-cancel" />
          </a>
        </TD>
      </TR>
    );
  }
}

Contact.propTypes = {
  data: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contact;
