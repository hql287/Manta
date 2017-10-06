// Libs
import faker from 'faker';
import uuidv4 from 'uuid/v4';

// Helpers to test
import {
  getInvoiceData,
  validateFormData,
  validateRecipient,
  validateRows,
  validateDueDate,
  validateCurrency,
  validateDiscount,
  validateVat,
  validateNote,
} from '../form';

// Mocks
jest.mock('../../renderers/dialog');
const openDialog = require('../../renderers/dialog');

describe('getInvoiceData', () => {
  let formData;
  beforeEach(() => {
    formData = {
      recipient: {
        newRecipient: true,
        select: {
          id: uuidv4(),
          fullname: faker.name.findName(),
          email: faker.internet.email(),
          company: faker.company.companyName(),
          phone: faker.phone.phoneNumber(),
        },
        new: {
          fullname: faker.name.findName(),
          email: faker.internet.email(),
        },
      },
      rows: [
        {
          id: uuidv4(),
          description: faker.commerce.productName(),
          price: faker.commerce.price(),
          quantity: faker.random.number(100),
        },
        {
          id: uuidv4(),
          description: faker.commerce.productName(),
          price: faker.commerce.price(),
          quantity: faker.random.number(100),
        },
      ],
      dueDate: {required: false},
      currency: {required: false},
      discount: {required: false},
      vat: {required: false},
      note: {required: false},
      settingsOpen: false,
    };
  });

  it('Should return correct data shape', () => {
    const invoiceData = getInvoiceData(formData);
    // Include Rows & Recipient Data
    expect(invoiceData).toHaveProperty('rows');
    expect(invoiceData).toHaveProperty('recipient');

    // Not include non-required data
    expect(invoiceData).not.toHaveProperty('dueDate');
    expect(invoiceData).not.toHaveProperty('currency');
    expect(invoiceData).not.toHaveProperty('discount');
    expect(invoiceData).not.toHaveProperty('vat');
    expect(invoiceData).not.toHaveProperty('note');
    expect(invoiceData).not.toHaveProperty('settingsOpen');
  });

  it('Should return rows data correctly', () => {
    const invoiceData = getInvoiceData(formData);
    expect(invoiceData.rows.length).toEqual(2);
  });

  it('should return correct recipient data', () => {
    let invoiceData = getInvoiceData(formData);
    // Filter out data
    expect(invoiceData.recipient).not.toHaveProperty('new');
    expect(invoiceData.recipient).not.toHaveProperty('select');
    expect(invoiceData.recipient).not.toHaveProperty('newRecipient');

    // Choose new contact data
    expect(invoiceData.recipient).toHaveProperty('fullname');
    expect(invoiceData.recipient).toHaveProperty('email');
    expect(invoiceData.recipient).not.toHaveProperty('company');
    expect(invoiceData.recipient).not.toHaveProperty('phone');

    // Choose selected contact data
    (formData.recipient.newRecipient = false), (invoiceData = getInvoiceData(
      formData,
    ));
    expect(invoiceData.recipient).toHaveProperty('fullname');
    expect(invoiceData.recipient).toHaveProperty('email');
    expect(invoiceData.recipient).toHaveProperty('company');
    expect(invoiceData.recipient).toHaveProperty('phone');
    expect(invoiceData.recipient).toHaveProperty('id');
  });

  it('should return dueDate data when required', () => {
    formData.dueDate = {
      required: true,
      selectedDate: {
        date: 20,
        months: 9,
        years: 2017,
      },
    };
    const invoiceData = getInvoiceData(formData);
    expect(invoiceData.dueDate).toEqual({
      date: 20,
      months: 9,
      years: 2017,
    });
    expect(invoiceData.dueDate).not.toEqual({
      date: 2,
      months: 10,
      years: 2016,
    });
  });

  it('should return currency data when required', () => {
    formData.currency = {
      required: true,
      selectedCurrency: {
        code: 'USD',
        symbol: '$',
      },
    };
    const invoiceData = getInvoiceData(formData);
    expect(invoiceData.currency).toEqual({
      code: 'USD',
      symbol: '$',
    });
    expect(invoiceData.dueDate).not.toEqual({
      code: 'VND',
      symbol: 'đ',
    });
  });

  it('should return note data when required', () => {
    formData.note = {
      required: true,
      content: faker.lorem.paragraph(),
    };
    const invoiceData = getInvoiceData(formData);
    expect(invoiceData.note).toEqual(formData.note.content);
  });

  it('should return vat data when required', () => {
    formData.vat = {
      required: true,
      amount: faker.random.number(20),
    };
    const invoiceData = getInvoiceData(formData);
    expect(invoiceData.vat).toEqual(formData.vat.amount);
    expect(invoiceData.vat).not.toEqual(21);
  });

  it('should return discount when required', () => {
    formData.discount = {
      required: true,
      amount: faker.random.number(20),
      type: 'flat',
    };
    const invoiceData = getInvoiceData(formData);
    expect(invoiceData.discount).toEqual({
      amount: formData.discount.amount,
      type: formData.discount.type,
    });
  });
});

describe('validateFormData', () => {
  let formData;
  beforeEach(() => {
    formData = {
      recipient: {
        newRecipient: true,
        select: {},
        new: {
          fullname: faker.name.findName(),
          email: faker.internet.email(),
          company: faker.company.companyName(),
          phone: faker.phone.phoneNumber(),
        },
      },
      rows: [{
        id: uuidv4(),
        description: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: faker.random.number(100),
      }],
      dueDate: {
        required: true,
        selectedDate: faker.date.future(),
      },
      currency: {
        required: true,
        selectedCurrency: {
          code: 'USD',
          symbol: '$'
        }
      },
      discount: {
        required: true,
        type: 'percentage',
        amount: 10,
      },
      vat: {
        required: true,
        amount: 10,
      },
      note: {
        required: true,
        content: faker.lorem.paragraph(),
      },
      settingsOpen: false,
    };
  });

  it('should PASS with CORRECT data', () => {
    const validation = validateFormData(formData);
    expect(validation).toEqual(true);
  });

  it('should NOT pass with INCORRECT recipient data', () => {
    formData.recipient.new = {};
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT rows data', () => {
    formData.rows[0].price = 0;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT dueDate data', () => {
    formData.dueDate.selectedDate = null;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT currency data', () => {
    formData.currency.selectedCurrency = null;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT discount data', () => {
    formData.discount.amount = 0;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT vat data', () => {
    formData.vat.amount = 0;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT note data', () => {
    formData.note.content = '';
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });
});

describe('validateRecipient', () => {
  it('should validate data presence', () => {
    const recipient = {
      newRecipient: true,
      new: {},
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Invalid Recipient',
      message: 'Recipient Cannnot Be Blank',
    });
  });

  it('should validate required fields data', () => {
    const recipient = {
      newRecipient: true,
      new: {
        email: faker.internet.email(),
        company: faker.company.companyName(),
      },
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Required Fields Empty',
      message: 'Please fill in all required field',
    });
  });

  it('should validate email format', () => {
    const recipient = {
      newRecipient: true,
      new: {
        fullname: faker.name.findName(),
        email: 'invalid-email-address',
      },
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Invalid Email Address',
      message: 'Please provide a valid email address',
    });
  });

  it('should not validate selected contact', () => {
    const recipient = {
      newRecipient: false,
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(true);
  });

  it('should pass correct recipient data', () => {
    const recipient = {
      newRecipient: true,
      new: {
        fullname: faker.name.findName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
      },
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(true);
  });
});

describe('validateRows', () => {
  it('should validate item description', () => {
    const rows = [
      { description: '' },
    ];
    const validation = validateRows(rows);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Required Field',
      message: 'Description can not be blank',
    });
  });

  it('should validate item price', () => {
    const rows = [
      {
        description: faker.commerce.productName(),
        price: 0,
      },
    ];
    const validation = validateRows(rows);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Required Field',
      message: 'Price must be greater than 0',
    });
  });

  it('should validate item price', () => {
    const rows = [
      {
        description: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: 0
      },
    ];
    const validation = validateRows(rows);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Required Field',
      message: 'Quantity must be greater than 0',
    });
  });

  it('should pass correct rows data', () => {
    const rows = [
      {
        description: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: faker.random.number(100),
      },
    ];
    const validation = validateRows(rows);
    expect(validation).toEqual(true);
  });
});

describe('validateDueDate', () => {
  it('should validate selectedDate', () => {
    const dueDate = {
      required: true,
      selectedDate: null
    };
    const validation = validateDueDate(dueDate);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Required Field',
      message: 'Must Select A Due Date',
    });
  });

  it('should pass when not required', () => {
    const dueDate = {
      required: false,
    };
    const validation = validateDueDate(dueDate);
    expect(validation).toEqual(true);
  });

  it('should pass correct dueDate data', () => {
    const dueDate = {
      required: true,
      selectedDate: faker.date.future()
    };
    const validation = validateDueDate(dueDate);
    expect(validation).toEqual(true);
  });
});

describe('validateCurrency', () => {
  it('should validate Currency', () => {
    const currency = {
      required: true,
      selectedCurrency: null
    };
    const validation = validateCurrency(currency);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Required Field',
      message: 'Must Select A Currency',
    });
  });

  it('should pass when not required', () => {
    const currency = {
      required: false,
    };
    const validation = validateCurrency(currency);
    expect(validation).toEqual(true);
  });

  it('should pass correct currency data', () => {
    const currency = {
      required: true,
      selectedCurrency: {
        code: 'USD',
        symbol: '$'
      }
    };
    const validation = validateCurrency(currency);
    expect(validation).toEqual(true);
  });
});

describe('validateDiscount', () => {
  it('should validate discount data', () => {
    const discount = {
      required: true,
      type: 'flat',
      amount: 0
    };
    const validation = validateDiscount(discount);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Required Field',
      message: 'Discount Amount Must Be Greater Than 0',
    });
  });

  it('should pass when not required', () => {
    const discount = {
      required: false,
    };
    const validation = validateDiscount(discount);
    expect(validation).toEqual(true);
  });

  it('should pass correct discount data', () => {
    const discount = {
      required: true,
      type: 'flat',
      amount: 10
    };
    const validation = validateDiscount(discount);
    expect(validation).toEqual(true);
  });
});

describe('validateVat', () => {
  it('should validate vat data', () => {
    const vat = {
      required: true,
      amount: 0
    };
    const validation = validateVat(vat);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Required Field',
      message: 'Tax Amount Must Be Greater Than 0',
    });
  });

  it('should pass when not required', () => {
    const vat = {
      required: false,
    };
    const validation = validateVat(vat);
    expect(validation).toEqual(true);
  });

  it('should pass correct vat data', () => {
    const vat = {
      required: true,
      amount: 10
    };
    const validation = validateVat(vat);
    expect(validation).toEqual(true);
  });
});

describe('validateNote', () => {
  it('should validate note data', () => {
    const note = {
      required: true,
      content: ''
    };
    const validation = validateNote(note);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: 'Required Field',
      message: 'Note Content Must Not Be Blank',
    });
  });

  it('should pass when not required', () => {
    const note = {
      required: false,
    };
    const validation = validateNote(note);
    expect(validation).toEqual(true);
  });

  it('should pass correct note data', () => {
    const note = {
      required: true,
      content: faker.lorem.paragraph()
    };
    const validation = validateNote(note);
    expect(validation).toEqual(true);
  });
});
