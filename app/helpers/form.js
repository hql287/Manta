const openDialog = require('../renderers/dialog');
import { isEmpty } from 'lodash';

function validateFormData(formData) {
  const {
    recipient,
    rows,
    dueDate,
    currency,
    discount,
    tax,
    note,
    settings,
  } = formData;
  // Required fields
  const { required_fields } = settings;
  if (!validateRecipient(recipient)) return false;
  if (!validateRows(rows)) return false;
  if (!validateDueDate(required_fields.dueDate, dueDate)) return false;
  if (!validateCurrency(required_fields.currency, currency)) return false;
  if (!validateDiscount(required_fields.discount, discount)) return false;
  if (!validateTax(required_fields.tax, tax)) return false;
  if (!validateNote(required_fields.note, note)) return false;
  return true;
}

function getInvoiceData(formData) {
  const {
    recipient,
    rows,
    dueDate,
    currency,
    discount,
    tax,
    note,
    settings,
  } = formData;
  // Required fields
  const { required_fields } = settings;
  // Set Initial Value
  const invoiceData = { rows };
  // Set Recipient
  if (recipient.newRecipient) {
    invoiceData.recipient = recipient.new;
  } else {
    invoiceData.recipient = recipient.select;
  }
  // Set Invoice DueDate
  if (required_fields.dueDate) invoiceData.dueDate = dueDate.selectedDate;
  // Set Invoice Currency
  if (required_fields.currency) invoiceData.currency = currency;
  // Set Invoice Discount
  if (required_fields.discount) invoiceData.discount = discount;
  // Set Invoice Tax
  if (required_fields.tax) invoiceData.tax = tax;
  // Set Invoice Note
  if (required_fields.note) invoiceData.note = note.content;
  // Return final value
  return invoiceData;
}

// VALIDATION RULES
function validateRecipient(recipient) {
  if (recipient.newRecipient === true) {
    // Is Recipient Form Data Empty?
    if (isEmpty(recipient.new)) {
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
}

function validateRows(rows) {
  let validated = true;
  // Added this check as per issue #97 "Allow product lines to be left empty or partially filled in"
  if (enableEmptyRow === false) {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
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
  return validated;
}

function validateDueDate(isRequired, dueDate) {
  const { selectedDate } = dueDate;
  if (isRequired) {
    if (!selectedDate || selectedDate === null) {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Must Select A Due Date',
      });
      return false;
    }
    return true;
  }
  return true;
}

function validateCurrency(isRequired, currency) {
  if (isRequired) {
    if (!currency || currency === null) {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Must Select A Currency',
      });
      return false;
    }
    return true;
  }
  return true;
}

function validateDiscount(isRequired, discount) {
  const { amount } = discount;
  if (isRequired) {
    if (!amount || amount === '' || amount === 0) {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Discount Amount Must Be Greater Than 0',
      });
      return false;
    }
    return true;
  }
  return true;
}

function validateTax(isRequired, tax) {
  const { amount } = tax;
  if (isRequired) {
    if (!amount || amount === '' || amount === 0) {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Tax Amount Must Be Greater Than 0',
      });
      return false;
    }
    return true;
  }
  return true;
}

function validateNote(isRequired, note) {
  const { content } = note;
  if (isRequired) {
    if (!content || content === '') {
      openDialog({
        type: 'warning',
        title: 'Required Field',
        message: 'Note Content Must Not Be Blank',
      });
      return false;
    }
    return true;
  }
  return true;
}

export {
  getInvoiceData,
  validateFormData,
  validateRecipient,
  validateRows,
  validateDueDate,
  validateCurrency,
  validateDiscount,
  validateTax,
  validateNote,
};
