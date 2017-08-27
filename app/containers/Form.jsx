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

import Button from '../components/shared/Button.jsx';

// Component
class Form extends Component {

  // Validate Form Data
  validateFormData = () => {
    const { rows, recipient, discount, note, dueDate, currency } = this.props.currentInvoice;
    if (!validateRows(rows)) return false;
    if (!validateRecipient(recipient)) return false;
    if (!validateDueDate(dueDate)) return false;
    if (!validateCurrency(currency)) return false;
    if (!validateDiscount(discount)) return false;
    if (!validateNote(note)) return false;
    return true;
  }

  // Save Form Data
  saveFormData = () => {
    // Validate Form Data
    if (!this.validateFormData()) return;
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

  // ToggleField
  toggleField = field => {
    const {dispatch} = this.props;
    const toggleField = bindActionCreators(
      FormActionCreators.toggleField,
      dispatch,
    );
    toggleField(field);
  };

  // HELPER FUNCTIONS
  // Get Invoice Data From Store and adjust before saving
  getInvoiceData = () => {
    const { recipient, rows, discount, note, dueDate, currency } = this.props.currentInvoice;
    // Set Initial Value
    let invoiceData = { rows };
    // Set Invoice DueDate
    if (dueDate.required) invoiceData.dueDate = dueDate.selectedDate;
    // Set Invoice Currency
    if (currency.required) invoiceData.currency = currency.selectedCurrency;
    // Set Invoice Note
    if (note.required) invoiceData.note = note.content;
    // Set Recipient
    if (recipient.newRecipient) {
      invoiceData.recipient = recipient.new;
    } else {
      const { fullname, company, email, phone } = recipient.select;
      invoiceData.recipient = { fullname, company, email, phone };
    }
    // Set Invoice Discount
    if (discount.required) {
      invoiceData.discount = {
        amount: discount.amount,
        type: discount.type,
      };
    }
    return invoiceData;
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
          <DueDate  toggleField={this.toggleField} />
          <Currency toggleField={this.toggleField} />
          <Discount toggleField={this.toggleField} />
          <Note     toggleField={this.toggleField} />
        </div>
        <div className="pageFooter">
          <Button primary onClick={() => this.saveFormData()}>
            Save
          </Button>
          <Button danger onClick={() => this.clearFormData()}>
            Clear
          </Button>
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

// VALIDATION RULES
function validateRows (rows) {
  let validated = true;
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

function validateRecipient (recipient) {
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

function validateDueDate(dueDate) {
  const { required, selectedDate } = dueDate;
  if (required) {
    if (!selectedDate || selectedDate === null ) {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Must Select A Due Date',
      });
      return false;
    } else {
      return true;
    }
  }
  return true;
}

function validateCurrency(currency) {
  const { required, selectedCurrency } = currency;
  if (required) {
    if (!selectedCurrency || selectedCurrency === null ) {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Must Select A Currency',
      });
      return false;
    } else {
      return true;
    }
  }
  return true;
}

function validateDiscount(discount) {
  const { required, amount } = discount;
  if (required) {
    if (!amount || amount === '' || amount === 0 ) {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Discount Amount Must Be Greater Than 0',
      });
      return false;
    } else {
      return true;
    }
  }
  return true;
}

function validateNote(note) {
  const { required, content } = note;
  if (required) {
    if (!content || content === '') {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Note Content Must Not Be Blank',
      });
      return false;
    } else {
      return true;
    }
  }
  return true;
}

export default connect(state => ({
  invoices: state.InvoicesReducer,
  recipients: state.ContactsReducer,
  currentInvoice: state.FormReducer,
}))(Form);
