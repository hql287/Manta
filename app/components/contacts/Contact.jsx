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
  static propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleteContact: PropTypes.func.isRequired,
  };

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
      <div className="contact row">
        <div className="col-md-1">
          <span className="contactNumber">
            {this.props.index + 1}
          </span>
        </div>
        <div className="col-md-3">
          <span>
            {contact.fullname}
          </span>
        </div>
        <div className="col-md-4">
          <span>
            {contact.email}
          </span>
        </div>
        <div className="col-md-3">
          <span>
            {contact.phone}
          </span>
        </div>

        <div className="contactActions col-md-1">
          <a
            href="#"
            className="deleteContact"
            onClick={() => this.openDeleteDialog(contact._id)}>
            <i className="ion-android-cancel" />
          </a>
        </div>
      </div>
    );
  };
}

export default Contact;

// <div className="col-md-2">
//   <a href="#" className="contactId" onClick={() => this.previewReceipt()}>
//     {_.truncate(contact._id, {
//       length: 8,
//       omission: '',
//     })}
//   </a>
// </div>
