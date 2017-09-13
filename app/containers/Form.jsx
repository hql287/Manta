// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as InvoicesActions from '../actions/invoices';
import * as ContactsActions from '../actions/contacts';
import * as FormActions from '../actions/form';

// 3rd Party Libs
import _ from 'lodash';

// Custom Libs
const openDialog = require('../renderers/dialog');

// Custom Components
import Recipient from '../components/form/Recipient';
import ItemsList from '../components/form/ItemsList';
import Currency from '../components/form/Currency';
import Discount from '../components/form/Discount';
import DueDate from '../components/form/DueDate';
import Vat from '../components/form/Vat';
import Note from '../components/form/Note';
import Settings from '../components/form/Settings';
import Button from '../components/shared/Button';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../components/shared/Layout';

// Animation
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Component
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { isSettingsOpened: false };
    this.saveFormData       = this.saveFormData.bind(this);
    this.clearFormData      = this.clearFormData.bind(this);
    this.toggleField        = this.toggleField.bind(this);
    this.updateFieldData    = this.updateFieldData.bind(this);
    this.toggleFormSettings = this.toggleFormSettings.bind(this);
  }

  toggleFormSettings() {
    this.setState({ isSettingsOpened: !this.state.isSettingsOpened });
  }

  // Process Form Data
  saveFormData() {
    const {currentInvoice} = this.props;
    // Validate Form Data
    if (!validateFormData(currentInvoice)) return;
    // Save To DB if it's a new contact
    if (currentInvoice.recipient.newRecipient) {
      const newContactData = currentInvoice.recipient.new;
      this.saveRecipienAsNewContact(newContactData);
    }
    // Save Invoice To DB
    this.saveInvoiceToDB(getInvoiceData(currentInvoice));
    // Clear The Form
    this.clearFormData();
  }

  // Clear Form Data
  clearFormData() {
    this.setState({ isSettingsOpened: false }, () => {
      const {dispatch} = this.props;
      dispatch(FormActions.clearForm());
    });
  }

  // ToggleField
  toggleField(field) {
    const {dispatch} = this.props;
    dispatch(FormActions.toggleField(field));
  }

  // Update Field Data
  updateFieldData(field, data) {
    const {dispatch} = this.props;
    dispatch(FormActions.updateFieldData(field, data));
  }

  // Save Recipient To DB
  saveRecipienAsNewContact(data) {
    const {dispatch} = this.props;
    dispatch(ContactsActions.saveContact(data));
  }

  // Save Invoice To DB
  saveInvoiceToDB(data) {
    const {dispatch} = this.props;
    dispatch(InvoicesActions.saveInvoice(data));
  }

  // Render The form
  render() {
    const {
      dueDate,
      currency,
      discount,
      vat,
      note
    } = this.props.currentInvoice;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Create A New Invoice</PageHeaderTitle>
          <PageHeaderActions>
            <Button primary onClick={this.saveFormData}>
              Save
            </Button>
            <Button danger onClick={this.clearFormData}>
              Clear
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <Settings
            isSettingsOpened={this.state.isSettingsOpened}
            toggleFormSettings={this.toggleFormSettings}
            toggleField={this.toggleField}
            currentInvoice={this.props.currentInvoice}
          />
          <Recipient />
          <ItemsList />
          { dueDate.required &&
            <DueDate
              dueDate={dueDate}
              updateFieldData={this.updateFieldData} />}
          { currency.required &&
            <Currency
              currency={currency}
              updateFieldData={this.updateFieldData} />}
          { discount.required &&
            <Discount
              discount={discount}
              updateFieldData={this.updateFieldData} />}
          { vat.required &&
            <Vat
              vat={vat}
              updateFieldData={this.updateFieldData} />}
          { note.required &&
            <Note
              note={note}
              updateFieldData={this.updateFieldData}/>}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Form.propTypes = {
  currentInvoice: PropTypes.shape({
    recipient: PropTypes.shape({
      newRecipient: PropTypes.bool.isRequired,
      select: PropTypes.object.isRequired,
      new: PropTypes.object.isRequired,
    }),
    rows: PropTypes.array,
    dueDate:  PropTypes.object,
    currency: PropTypes.object,
    discount: PropTypes.object,
    vat:      PropTypes.object,
    note:     PropTypes.object,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// HELPERS
function validateFormData (currentInvoice) {
  const {
    recipient,
    rows,
    dueDate,
    currency,
    discount,
    vat,
    note
  } = currentInvoice;
  if (!validateRows(rows)) return false;
  if (!validateRecipient(recipient)) return false;
  if (!validateDueDate(dueDate)) return false;
  if (!validateCurrency(currency)) return false;
  if (!validateDiscount(discount)) return false;
  if (!validateVat(vat)) return false;
  if (!validateNote(note)) return false;
  return true;
}

function getInvoiceData (currentInvoice) {
  const {
    recipient,
    rows,
    dueDate,
    currency,
    discount,
    vat,
    note
  } = currentInvoice;
  // Set Initial Value
  let invoiceData = { rows };
  // Set Invoice DueDate
  if (dueDate.required) invoiceData.dueDate = dueDate.selectedDate;
  // Set Invoice Currency
  if (currency.required) invoiceData.currency = currency.selectedCurrency;
  // Set Invoice Note
  if (note.required) invoiceData.note = note.content;
  // Set Invoice Tax
  if (vat.required) invoiceData.vat = vat.amount;
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

function validateVat(vat) {
  const { required, amount } = vat;
  if (required) {
    if (!amount || amount === '' || amount === 0 ) {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Tax Amount Must Be Greater Than 0',
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

// Export
export default compose(
  connect(state => ({ currentInvoice: state.FormReducer })),
  _withFadeInAnimation
)(Form);
