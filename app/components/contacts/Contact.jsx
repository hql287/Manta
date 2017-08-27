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

// Custom Components
import Button from '../shared/Button';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardButton,
} from '../shared/Card.jsx';


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
      <Card>
        <CardBody>
          <CardTitle>{contact.fullname}</CardTitle>
          <CardSubtitle>{contact.company}</CardSubtitle>
          <CardText>
            {contact.email}
            <br/>
            {contact.phone}
          </CardText>
          <Button primary>Edit</Button>
          <Button danger onClick={() => this.openDeleteDialog(contact._id)}>
            Delete
          </Button>
        </CardBody>
      </Card>
    );
  };
}

Contact.propTypes = {
  data: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contact;
