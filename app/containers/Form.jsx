// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as FormActionCreators from '../actions/form';
import * as InvoicesActionCreators from '../actions/invoices';
import * as ContactsActionCreators from '../actions/contacts';

// 3rd Party Libs
import _ from 'lodash';

// Custom Libs
import sounds from '../../libs/sounds';
const openDialog = require('../renderers/dialog');

// Layout
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
  PageFooter,
  } from '../components/shared/Layout';

// Animation
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Components
import Recipient from '../components/form/Recipient';
import ItemsList from '../components/form/ItemsList';
import Currency from '../components/form/Currency';
import Discount from '../components/form/Discount';
import DueDate from '../components/form/DueDate';
import Note from '../components/form/Note';
import Button from '../components/shared/Button';

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
    const {currentInvoice} = this.props;
    // Save To DB if it's a new contact
    if (currentInvoice.recipient.newRecipient) {
      const newContactData = currentInvoice.recipient.new;
      this.saveRecipienAsNewContact(newContactData);
    }
    // Save Invoice To DB
    this.saveInvoiceToDB(getInvoiceData(currentInvoice));
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
  toggleField = (field, cb=null) => {
    const {dispatch} = this.props;
    const toggleField = bindActionCreators(
      FormActionCreators.toggleField,
      dispatch,
    );
    toggleField(field);
    // Execute Call Back
    cb && cb();
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
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Create A New Invoice</PageHeaderTitle>
          <PageHeaderActions>
            <Button primary onClick={() => this.saveFormData()}>
              Save
            </Button>
            <Button danger onClick={() => this.clearFormData()}>
              Clear
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <Recipient />
          <ItemsList />
          <DueDate  toggleField={this.toggleField} />
          <Currency toggleField={this.toggleField} />
          <Discount toggleField={this.toggleField} />
          <Note     toggleField={this.toggleField} />
        </PageContent>
      </PageWrapper>
    );
  };
}

// PropTypes Validation
Form.propTypes = {
  invoices: PropTypes.object.isRequired,
  recipients: PropTypes.object.isRequired,
  currentInvoice: PropTypes.object.isRequired,
};

// HELPERS
function getInvoiceData (currentInvoice) {
  const { recipient, rows, discount, note, dueDate, currency } = currentInvoice;
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

// Map State to Props
Form = connect(state => ({
  invoices: state.InvoicesReducer,
  recipients: state.ContactsReducer,
  currentInvoice: state.FormReducer,
}))(Form);

// Add Faded In Animation
Form = _withFadeInAnimation(Form);

// Export
export default Form;
