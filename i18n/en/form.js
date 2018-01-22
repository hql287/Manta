export default {
  header: {
    name: 'Create A New Invoice',
    btns: {
      clear: 'Clear',
      update: 'Update',
      saveAndPreview: 'Save & Preview',
    },
  },
  settings: {
    name: 'Form Settings',
    hint: 'Toogle any field to make it required in the form.',
  },
  fields: {
    items: {
      name: 'Product/Service',
      description: 'Description',
      price: 'Price',
      quantity: 'Quantity',
      add: 'Add a New Item',
    },
    recipient: {
      name: 'Recipient',
      select: 'Select',
      add: 'Create New',
      fullname: 'Fullname',
      company: 'Company',
      email: 'Email',
      phone: 'Phone Number',
    },
    discount: {
      name: 'Discount',
      percentage: 'Percentage',
      flat: 'Flat Rate',
    },
    dueDate: {
      name: 'Due Date',
      placeHolder: 'Select a Date',
    },
    tax: {
      name: 'Tax',
      id: 'Tax ID',
      method: 'Method',
      reverse: 'Reverse Charge',
    },
    note: {
      name: 'Note',
    },
    currency: {
      name: 'Currency',
    },
  },
  common: {
    default: 'Default',
    amount: 'Amount',
    saveAsDefault: 'Save as Default?',
  },
};
