// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as FormActionCreators from '../actions/form.jsx';
import * as InvoicesActionCreators from '../actions/invoices.jsx';
import * as ContactsActionCreators from '../actions/contacts.jsx';

// Custom Libs
import sounds from '../../libs/sounds.js';
const openDialog = require('../renderers/dialog.js');

// Components
import Recipient from '../components/form/Recipient.jsx';
import ItemsList from '../components/form/ItemsList.jsx';
import Currency from '../components/form/Currency.jsx';
import Discount from '../components/form/Discount.jsx';
import Note from '../components/form/Note.jsx';

// Component
class Form extends Component {

  // Save Data
  saveData() {
    const {currentInvoice} = this.props;
    // Validate Form
    if (!this.validateForm()) return;
    // Save To DB if it's a new contact
    if (currentInvoice.recipient.type === 'new') {
      const newContactData = currentInvoice.recipient.new;
      this.saveRecipienAsNewContact(newContactData);
    }
    // Save Invoice To DB
    this.saveInvoiceToDB(this.getInvoiceData());
    // Clear The Form
    this.clearForm('muted');
    // Play a Sound
    sounds.play('ADD');
  }

  getInvoiceData() {
    let invoiceData;
    const {currentInvoice} = this.props;
    if (currentInvoice.recipient.type === 'new') {
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
  }

  // Save Invoice To DB
  saveInvoiceToDB(data) {
    // Dispatch Action
    const {dispatch} = this.props;
    const saveInvoice = bindActionCreators(
      InvoicesActionCreators.saveInvoice,
      dispatch
    );
    // Save The Invoice
    saveInvoice(data);
  }

  // Save Recipient To DB
  saveRecipienAsNewContact(data) {
    // Dispatch Action
    const {dispatch} = this.props;
    const saveContact = bindActionCreators(
      ContactsActionCreators.saveContact,
      dispatch
    );
    // Save New Contact
    saveContact(data);
  }

  // Clear The Form
  clearForm(vol) {
    // Dispatch Clear Form Action
    const {dispatch} = this.props;
    const clearForm = bindActionCreators(
      FormActionCreators.clearForm,
      dispatch
    );
    clearForm();
    // Play A Sound
    if (!vol) sounds.play('RELOAD');
  }

  // Validate Form
  validateForm() {
    let validated = true;
    // Validate Each Row Content
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
  }

  // Render The form
  render() {
    return (
      <div className="pageWrapper">
        <div className="pageHeader">
          <h4>New Invoice</h4>
        </div>
        <div className="pageContent">
          <Recipient/>
          <Currency />
          <ItemsList />
          <Discount />
          <Note />
        </div>
        <div className="pageFooter">
          <a href="#" onClick={() => this.saveData()}>
            <i className="ion-android-checkmark-circle" />
          </a>
          <a href="#" onClick={() => this.clearForm()}>
            <i className="ion-ios-loop-strong" />
          </a>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  invoices: state.InvoicesReducer,
  recipients: state.ContactsReducer,
  currentInvoice: state.FormReducer,
}))(Form);
