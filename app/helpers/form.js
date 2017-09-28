const openDialog = require('../renderers/dialog');
import _ from 'lodash';

function validateFormData(formData) {
  const {
    recipient,
    rows,
    dueDate,
    currency,
    discount,
    vat,
    note,
  } = formData;
  if (!validateRecipient(recipient)) return false;
  if (!validateRows(rows)) return false;
  if (!validateDueDate(dueDate)) return false;
  if (!validateCurrency(currency)) return false;
  if (!validateDiscount(discount)) return false;
  if (!validateVat(vat)) return false;
  if (!validateNote(note)) return false;
  return true;
}

function getInvoiceData(formData) {
  const {
    recipient,
    rows,
    dueDate,
    currency,
    discount,
    vat,
    note,
  } = formData;
  // Set Initial Value
  let invoiceData = {rows};
  // Set Recipient
  if (recipient.newRecipient) {
    invoiceData.recipient = recipient.new;
  } else {
    invoiceData.recipient = recipient.select;
  }
  // Set Invoice DueDate
  if (dueDate.required) invoiceData.dueDate = dueDate.selectedDate;
  // Set Invoice Currency
  if (currency.required) invoiceData.currency = currency.selectedCurrency;
  // Set Invoice Note
  if (note.required) invoiceData.note = note.content;
  // Set Invoice Tax
  if (vat.required) invoiceData.vat = vat.amount;
  // Set Invoice Discount
  if (discount.required) {
    invoiceData.discount = {
      amount: discount.amount,
      type: discount.type,
    };
  }
  return invoiceData;
}

// VALIDATION RULES
function validateRecipient(recipient) {
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
}

function validateRows(rows) {
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
}

function validateDueDate(dueDate) {
  const {required, selectedDate} = dueDate;
  if (required) {
    if (!selectedDate || selectedDate === null) {
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
  const {required, selectedCurrency} = currency;
  if (required) {
    if (!selectedCurrency || selectedCurrency === null) {
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
  const {required, amount} = discount;
  if (required) {
    if (!amount || amount === '' || amount === 0) {
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
  const {required, amount} = vat;
  if (required) {
    if (!amount || amount === '' || amount === 0) {
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
  const {required, content} = note;
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

export {
  getInvoiceData,
  validateFormData,
};
