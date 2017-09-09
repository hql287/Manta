// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
} from '../shared/Card.jsx';

// Component
class Contact extends Component {
  constructor(props) {
    super(props);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
  }

  componentDidMount() {
    const deleteContact = this.props.deleteContact;
    ipc.on('confirmed-delete-contact', (event, index, contactId) => {
      if (index === 0 && contactId === this.props.data._id) {
        deleteContact(contactId);
        sounds.play('REMOVE');
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data._id !== nextProps.data._id;
  }

  openDeleteDialog() {
    openDialog(
      {
        type: 'warning',
        title: 'Delete This Contact',
        message: 'Are You Sure?',
        buttons: ['Yes', 'No'],
      },
      'confirmed-delete-contact',
      this.props.data._id
    );
  }

  render() {
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
          <Button danger onClick={this.openDeleteDialog}>
            Delete
          </Button>
        </CardBody>
      </Card>
    );
  }
}

Contact.propTypes = {
  data: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contact;
