// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as FormActionCreators from '../actions/form.jsx';
import * as InvoicesActionCreators from '../actions/invoices.jsx';
import * as ContactsActionCreators from '../actions/contacts.jsx';

// 3rd Party Libs
import _ from 'lodash';

// Custom Libs
import sounds from '../../libs/sounds.js';
const openDialog = require('../renderers/dialog.js');

// Components
import Recipient from '../components/form/Recipient.jsx';
import ItemsList from '../components/form/ItemsList.jsx';
import Currency from '../components/form/Currency.jsx';
import Discount from '../components/form/Discount.jsx';
import DueDate from '../components/form/DueDate.jsx';
import Note from '../components/form/Note.jsx';

// Component
class Form extends Component {
  // Validate Each Row Content
  validateRows = () => {
    let validated = true;
    const {rows} = this.props.currentInvoice;
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      // Does it contain description?
      if (!row.description) {
        openDialog({
          type: 'warning',
          title: 'Required Field',
          message: 'Description can not be blank',
        });
        validated = false;
        break;
      }
      // Is the price presented and greater than 0?
      if (!row.price || row.price === 0) {
        openDialog({
          type: 'warning',
          title: 'Required Field',
          message: 'Price must be greater than 0',
        });
        validated = false;
        break;
      }
      // Is the quantity presented and greater than 0?
      if (!row.quantity || row.quantity === 0) {
        openDialog({
          type: 'warning',
          title: 'Required Field',
          message: 'Quantity must be greater than 0',
        });
        validated = false;
        break;
      }
    }
    return validated;
  };

  // Validate Recipient Data
  validateRecipient = () => {
    const {recipient} = this.props.currentInvoice;
    if (recipient.newRecipient === true) {
      // Is Recipient Form Data Empty?
      if (_.isEmpty(recipient.new)) {
        openDialog({
          type: 'warning',
          title: 'Invalid Recipient',
          message: 'Recipient Cannnot Be Blank',
        });
        return false;
      }
      // Are required fields empty?
      if (
        recipient.new.fullname === undefined ||
        recipient.new.fullname === '' ||
        recipient.new.email === undefined ||
        recipient.new.email === ''
      ) {
        openDialog({
          type: 'warning',
          title: 'Required Fields Empty',
          message: 'Please fill in all required field',
        });
        return false;
      }
      // Is email address valid?
      const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regex.test(recipient.new.email)) {
        openDialog({
          type: 'warning',
          title: 'Invalid Email Address',
          message: 'Please provide a valid email address',
        });
        return false;
      }
    }
    // Passed
    return true;
  };

  // Save Form Data
  saveFormData = () => {
    // Validate Recipient Data
    if (!this.validateRecipient()) return;
    // Validate Each Row Content
    if (!this.validateRows()) return;
    // Save To DB if it's a new contact
    const {currentInvoice} = this.props;
    if (currentInvoice.recipient.newRecipient) {
      const newContactData = currentInvoice.recipient.new;
      this.saveRecipienAsNewContact(newContactData);
    }
    // Save Invoice To DB
    this.saveInvoiceToDB(this.getInvoiceData());
    // Clear The Form
    this.clearFormData('muted');
    // Play a Sound
    sounds.play('ADD');
  };

  // Clear Form Data
  clearFormData = vol => {
    // Dispatch Clear Form Action
    const {dispatch} = this.props;
    const clearForm = bindActionCreators(
      FormActionCreators.clearForm,
      dispatch,
    );
    clearForm();
    // Play A Sound
    if (!vol) sounds.play('RELOAD');
  };

  // HELPER FUNCTIONS
  // Get Invoice Data From Store and adjust before saving
  getInvoiceData = () => {
    let invoiceData;
    const {currentInvoice} = this.props;
    if (currentInvoice.recipient.newRecipient) {
      invoiceData = Object.assign({}, currentInvoice, {
        recipient: currentInvoice.recipient.new,
      });
    } else {
      const selectedRecipient = currentInvoice.recipient.select;
      const selectedRecipientData = {
        fullname: selectedRecipient.fullname,
        company: selectedRecipient.company,
        email: selectedRecipient.email,
        phone: selectedRecipient.phone,
      };
      invoiceData = Object.assign({}, currentInvoice, {
        recipient: selectedRecipientData,
      });
    }
    return invoiceData;
  };

  // Save Invoice To DB
  saveInvoiceToDB = data => {
    // Dispatch Action
    const {dispatch} = this.props;
    const saveInvoice = bindActionCreators(
      InvoicesActionCreators.saveInvoice,
      dispatch,
    );
    // Save The Invoice
    saveInvoice(data);
  };

  // Save Recipient To DB
  saveRecipienAsNewContact = data => {
    // Dispatch Action
    const {dispatch} = this.props;
    const saveContact = bindActionCreators(
      ContactsActionCreators.saveContact,
      dispatch,
    );
    // Save New Contact
    saveContact(data);
  };

  // Render The form
  render = () => {
    return (
      <div className="pageWrapper">
        <div className="pageHeader">
          <h4>New Invoice</h4>
        </div>
        <div className="pageContent">
          <Recipient />
          <ItemsList />
          <DueDate/>
          <Currency />
          <Discount />
          <Note />
        </div>
        <div className="pageFooter">
          <a href="#" onClick={() => this.saveFormData()}>
            <i className="ion-android-checkmark-circle" />
          </a>
          <a href="#" onClick={() => this.clearFormData()}>
            <i className="ion-ios-loop-strong" />
          </a>
        </div>
      </div>
    );
  };
}

// PropTypes Validation
Form.propTypes = {
  invoices: PropTypes.object.isRequired,
  recipients: PropTypes.object.isRequired,
  currentInvoice: PropTypes.object.isRequired,
};

export default connect(state => ({
  invoices: state.InvoicesReducer,
  recipients: state.ContactsReducer,
  currentInvoice: state.FormReducer,
}))(Form);
