// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const format = require('date-fns/format');
const _ = require('lodash');

// Custom Libs
const openDialog = require('../../renderers/dialog.js');
import sounds from '../../../libs/sounds.js';

// Component
class Contact extends Component {
  componentDidMount() {
    const deleteContact = this.props.deleteContact;
    ipc.on('confirmed-delete-contact', (event, index, contactId) => {
      if (index === 0 && contactId === this.props.data._id) {
        deleteContact(contactId);
        sounds.play('REMOVE');
      }
    });
  }

  openDeleteDialog = contactId => {
    openDialog(
      {
        type: 'warning',
        title: 'Delete This Contact',
        message: 'Are You Sure?',
        buttons: ['Yes', 'No'],
      },
      'confirmed-delete-contact',
      contactId,
    );
  };

  // Render
  render = () => {
    const contact = this.props.data;
    return (
      <div className="col-md-6">
        <div className="contact card">
          <div className="card-body">
            <h4 className="card-title">{contact.fullname}</h4>
            <h6 className="card-subtitle mb-2 text-muted">{contact.company}</h6>
            <p className="card-text">
              {contact.email}
              <br/>
              {contact.phone}
            </p>

            <a
              href="#"
              className="card-link">
              Edit
            </a>
            <a
              href="#"
              className="card-link text-danger"
              onClick={() => this.openDeleteDialog(contact._id)}>
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  };
}

Contact.propTypes = {
  data: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contact;
