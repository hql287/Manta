// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as FormActionCreators from '../actions/form.jsx';
import * as ReceiptsActionCreators from '../actions/receipts.jsx';
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
    const {currentReceipt} = this.props;
    // Validate Form
    if (!this.validateForm()) return;
    // Save To DB if it's a new contact
    if (currentReceipt.recipient.type === 'new') {
      const newContactData = currentReceipt.recipient.new;
      this.saveRecipienAsNewContact(newContactData);
    }
    // Save Receipt To DB
    this.saveReceiptToDB(this.getReceiptData());
    // Clear The Form
    this.clearForm('muted');
    // Play a Sound
    sounds.play('ADD');
  }

  getReceiptData() {
    let receiptData;
    const {currentReceipt} = this.props;
    if (currentReceipt.recipient.type === 'new') {
      receiptData = Object.assign({}, currentReceipt, {
        recipient: currentReceipt.recipient.new,
      });
    } else {
      const selectedRecipient = currentReceipt.recipient.select;
      const selectedRecipientData = {
        fullname: selectedRecipient.fullname,
        company: selectedRecipient.company,
        email: selectedRecipient.email,
        phone: selectedRecipient.phone,
      };
      receiptData = Object.assign({}, currentReceipt, {
        recipient: selectedRecipientData,
      });
    }
    return receiptData;
  }

  // Save Receipt To DB
  saveReceiptToDB(data) {
    // Dispatch Action
    const {dispatch} = this.props;
    const saveReceipt = bindActionCreators(
      ReceiptsActionCreators.saveReceipt,
      dispatch
    );
    // Save The Receipt
    saveReceipt(data);
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
    const {rows} = this.props.currentReceipt;
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
          <h4>New Receipt</h4>
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
  receipts: state.ReceiptsReducer,
  recipients: state.ContactsReducer,
  currentReceipt: state.FormReducer,
}))(Form);
