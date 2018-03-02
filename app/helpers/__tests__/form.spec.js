// Libs
import faker from 'faker';
import uuidv4 from 'uuid/v4';
import i18n from '../../../i18n/i18n';
import omit from 'lodash';

// Helpers to test
import {
  getInvoiceData,
  validateFormData,
  validateRecipient,
  validateRows,
  validateDueDate,
  validateCurrency,
  validateDiscount,
  validateTax,
  validateNote,
  setEditRecipient,
} from '../form';

// Mocks
jest.mock('../../renderers/dialog');
const openDialog = require('../../renderers/dialog');

describe('getInvoiceData', () => {
  let formData;
  beforeEach(() => {
    formData = {
      invoiceID: 'Invoice: 123-456-789',
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
      dueDate: {
        selectedDate: null,
        paymentTerm: null,
        useCustom: true,
      },
      currency: {
        code: 'USD',
        placement: 'before',
        fraction: 2,
        separator: 'commaDot',
      },
      discount: {},
      tax: {},
      note: {},
      settings: {
        editMode: {
          active: false,
        },
        open: false,
        required_fields: {
          invoiceID: false,
          dueDate: false,
          currency: false,
          discount: false,
          tax: false,
          note: false,
        },
      },
      savedSettings: {
        tax: {},
        currency: {
          code: 'USD',
          placement: 'before',
          fraction: 2,
          separator: 'commaDot',
        },
        required_fields: {
          invoiceID: false,
          dueDate: false,
          currency: false,
          discount: false,
          tax: false,
          note: false,
        },
      },
    };
  });

  it('Should return correct data shape', () => {
    const invoiceData = getInvoiceData(formData);
    // Include custom invoiceID
    expect(invoiceData).not.toHaveProperty('invoiceID');
    // Include Rows & Recipient Data
    expect(invoiceData).toHaveProperty('rows');
    expect(invoiceData).toHaveProperty('recipient');
    expect(invoiceData).toHaveProperty('currency');
    // Not include non-required data
    expect(invoiceData).not.toHaveProperty('dueDate');
    expect(invoiceData).not.toHaveProperty('discount');
    expect(invoiceData).not.toHaveProperty('tax');
    expect(invoiceData).not.toHaveProperty('note');
    expect(invoiceData).not.toHaveProperty('settings');
    expect(invoiceData).not.toHaveProperty('savedSettings');
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
    (formData.recipient.newRecipient = false),
      (invoiceData = getInvoiceData(formData));
    expect(invoiceData.recipient).toHaveProperty('fullname');
    expect(invoiceData.recipient).toHaveProperty('email');
    expect(invoiceData.recipient).toHaveProperty('company');
    expect(invoiceData.recipient).toHaveProperty('phone');
    expect(invoiceData.recipient).toHaveProperty('id');
  });

  it('should return dueDate data when required', () => {
    const newFormData = Object.assign({}, formData, {
      dueDate: {
        selectedDate: {
          date: 20,
          months: 9,
          years: 2017,
        },
        useCustom: true,
        paymentTerm: null,
      },
      settings: Object.assign({}, formData.settings, {
        required_fields: Object.assign({}, formData.settings.required_fields, {
          dueDate: true,
        }),
      }),
    });
    const invoiceData = getInvoiceData(newFormData);
    expect(invoiceData.dueDate).toEqual({
      selectedDate: {
        date: 20,
        months: 9,
        years: 2017,
      },
      useCustom: true,
      paymentTerm: null,
    });
    expect(invoiceData.dueDate).not.toEqual({
      date: 2,
      months: 10,
      years: 2016,
    });
  });

  it('should return currency data when required', () => {
    const newFormData = Object.assign({}, formData, {
      settings: Object.assign({}, formData.settings, {
        required_fields: Object.assign({}, formData.settings.required_fields, {
          currency: true,
        }),
      }),
    });

    const invoiceData = getInvoiceData(newFormData);
    expect(invoiceData.currency).toEqual({
      code: 'USD',
      placement: 'before',
      fraction: 2,
      separator: 'commaDot',
    });
    expect(invoiceData.dueDate).not.toEqual({
      code: 'VND',
      placement: 'after',
      fraction: 0,
      separator: 'spaceDot',
    });
  });

  it('should return tax data when required', () => {
    const newFormData = Object.assign({}, formData, {
      tax: {
        amount: faker.random.number(20),
        method: 'reverse',
        tin: '123-456-789',
      },
      settings: Object.assign({}, formData.settings, {
        required_fields: Object.assign({}, formData.settings.required_fields, {
          tax: true,
        }),
      }),
    });
    const invoiceData = getInvoiceData(newFormData);
    expect(invoiceData.tax).toEqual(newFormData.tax);
  });

  it('should return discount when required', () => {
    const newFormData = Object.assign({}, formData, {
      discount: {
        amount: faker.random.number(20),
        type: 'flat',
      },
      settings: Object.assign({}, formData.settings, {
        required_fields: Object.assign({}, formData.settings.required_fields, {
          discount: true,
        }),
      }),
    });
    const invoiceData = getInvoiceData(newFormData);
    expect(invoiceData.discount).toEqual({
      type: newFormData.discount.type,
      amount: newFormData.discount.amount,
    });
  });

  it('should return note data when required', () => {
    const newFormData = Object.assign({}, formData, {
      note: {
        content: faker.lorem.paragraph(),
      },
      settings: Object.assign({}, formData.settings, {
        required_fields: Object.assign({}, formData.settings.required_fields, {
          note: true,
        }),
      }),
    });
    const invoiceData = getInvoiceData(newFormData);
    expect(invoiceData.note).toEqual(newFormData.note.content);
  });

  it('should return invoiceID data when required', () => {
    const newFormData = Object.assign({}, formData, {
      settings: Object.assign({}, formData.settings, {
        required_fields: Object.assign({}, formData.settings.required_fields, {
          invoiceID: true,
        }),
      }),
    });
    const invoiceData = getInvoiceData(newFormData);
    expect(invoiceData.invoiceID).toEqual('Invoice: 123-456-789');
  });

  it('should return correct metadata on editMode', () => {
    const invoiceID = uuidv4();
    const invoiceRev = uuidv4();
    const createdDate = Date.now();
    const newFormData = Object.assign({}, formData, {
      settings: Object.assign({}, formData.settings, {
        editMode: Object.assign({}, formData.settings.editMode, {
          active: true,
          data: Object.assign({}, omit(formData, ['settings, savedSettings']),
            {
              _id: invoiceID,
              _rev: invoiceRev,
              created_at: createdDate
            }
          )
        }),
      }),
    });
    const invoiceData = getInvoiceData(newFormData);
    expect(invoiceData._id).toEqual(invoiceID);
    expect(invoiceData._rev).toEqual(invoiceRev);
    expect(invoiceData.created_at).toEqual(createdDate);
  });

  // TODO
  it('set status as pending when creating a new invoice');
  it('always generate _id when creating a new invoice');
  it('does not include _rev when creating a new invoice');
  it('always recalculate subTotal and grandTotal');
});

describe('validateFormData', () => {
  let formData;
  beforeEach(() => {
    formData = {
      invoiceID: 'Invoice 123-456-789',
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
      rows: [
        {
          id: uuidv4(),
          description: faker.commerce.productName(),
          price: faker.commerce.price(),
          quantity: faker.random.number(100),
        },
      ],
      dueDate: {
        selectedDate: faker.date.future(),
        useCustom: true,
        paymentTerm: null,
      },
      currency: {
        code: 'USD',
        placement: 'before',
        fraction: 2,
        separator: 'commaDot',
      },
      discount: {
        type: 'percentage',
        amount: 10,
      },
      tax: {
        amount: 10,
        method: 'reverse',
        tin: '123-456-789',
      },
      note: {
        content: faker.lorem.paragraph(),
      },
      settings: {
        open: false,
        required_fields: {
          invoiceID: true,
          dueDate: true,
          currency: true,
          discount: true,
          tax: true,
          note: true,
        },
      },
      savedSettings: {
        tax: {
          amount: 10,
          method: 'reverse',
          tin: '123-456-789',
        },
        currency: {
          code: 'USD',
          placement: 'before',
          fraction: 2,
          separator: 'commaDot',
        },
        required_fields: {
          invoiceID: true,
          dueDate: true,
          currency: true,
          discount: true,
          tax: true,
          note: true,
        },
      },
    };
  });

  it('should PASS with CORRECT data', () => {
    const validation = validateFormData(formData);
    expect(validation).toEqual(true);
  });

  it('should NOT pass with INCORRECT recipient data', () => {
    const newFormData = Object.assign({}, formData, {
      recipient: Object.assign({}, formData.recipient, {
        new: {},
      }),
    });
    const validation = validateFormData(newFormData);
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
    formData.currency = {
      code: 'USD',
      fraction: -1,
      separator: 'commaDot',
      placement: 'before'
    };
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT discount data', () => {
    formData.discount.amount = 0;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT tax data', () => {
    formData.tax.amount = 0;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT note data', () => {
    formData.note.content = '';
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT invoiceID', () => {
    formData.invoiceID = '';
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
      title: i18n.t('dialog:validation:recipient:empty:title'),
      message: i18n.t('dialog:validation:recipient:empty:message'),
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
      title: i18n.t('dialog:validation:recipient:requiredFields:title'),
      message: i18n.t('dialog:validation:recipient:requiredFields:message'),
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
      title: i18n.t('dialog:validation:recipient:email:title'),
      message: i18n.t('dialog:validation:recipient:email:message'),
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
    const rows = [{ description: '' }];
    const validation = validateRows(rows);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:rows:emptyDescription:title'),
      message: i18n.t('dialog:validation:rows:emptyDescription:message'),
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
      title: i18n.t('dialog:validation:rows:priceZero:title'),
      message: i18n.t('dialog:validation:rows:priceZero:message'),
    });
  });

  it('should validate item quantity', () => {
    const rows = [
      {
        description: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: 0,
      },
    ];
    const validation = validateRows(rows);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:rows:qtyZero:title'),
      message: i18n.t('dialog:validation:rows:qtyZero:message'),
    });

    const rows2 = [
      {
        description: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: -1,
      },
    ];
    const validation2 = validateRows(rows2);
    expect(validation2).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:rows:qtyZero:title'),
      message: i18n.t('dialog:validation:rows:qtyZero:message'),
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
      useCustom: true,
      selectedDate: null,
      paymentTerm: null,
    };
    const validation = validateDueDate(true, dueDate);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:dueDate:title'),
      message: i18n.t('dialog:validation:dueDate:message'),
    });
  });

  it('should pass when not required', () => {
    const dueDate = {
      selectedDate: null,
    };
    const validation = validateDueDate(false, dueDate);
    expect(validation).toEqual(true);
  });

  it('should pass correct dueDate data', () => {
    const dueDate = {
      selectedDate: faker.date.future(),
    };
    const validation = validateDueDate(true, dueDate);
    expect(validation).toEqual(true);
  });
});

describe('validateCurrency', () => {
  it('should validate Currency', () => {
    const currency = {
      code: 'USD',
      fraction: -1,
      separator: 'commaDot',
      placement: 'before'
    };
    const validation = validateCurrency(true, currency);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:currency:fraction:title'),
      message: i18n.t('dialog:validation:currency:fraction:message'),
    });
  });

  it('should pass when not required', () => {
    const currency = {};
    const validation = validateCurrency(false, currency);
    expect(validation).toEqual(true);
  });

  it('should pass correct currency data', () => {
    const currency = {
      code: 'USD',
      placement: 'before',
      fraction: 2,
      separator: 'commaDot',
    };
    const validation = validateCurrency(true, currency);
    expect(validation).toEqual(true);
  });
});

describe('validateDiscount', () => {
  it('should validate discount data', () => {
    const discount = {
      type: 'flat',
      amount: 0,
    };
    const validation = validateDiscount(true, discount);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:discount:title'),
      message: i18n.t('dialog:validation:discount:message'),
    });
  });

  it('should pass when not required', () => {
    const discount = {};
    const validation = validateDiscount(false, discount);
    expect(validation).toEqual(true);
  });

  it('should pass correct discount data', () => {
    const discount = {
      type: 'flat',
      amount: 10,
    };
    const validation = validateDiscount(true, discount);
    expect(validation).toEqual(true);
  });
});

describe('validateTax', () => {
  it('should validate tax data', () => {
    const tax1 = { amount: 0 };
    const tax2 = { amount: '' };
    const tax3 = { amount: -1 };
    const validation1 = validateTax(true, tax1);
    expect(validation1).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:tax:title'),
      message: i18n.t('dialog:validation:tax:message'),
    });

    const validation2 = validateTax(true, tax2);
    expect(validation2).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:tax:title'),
      message: i18n.t('dialog:validation:tax:message'),
    });

    const validation3 = validateTax(true, tax3);
    expect(validation3).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:tax:title'),
      message: i18n.t('dialog:validation:tax:message'),
    });
  });

  it('should pass when not required', () => {
    const tax = {};
    const validation = validateTax(false, tax);
    expect(validation).toEqual(true);
  });

  it('should pass correct tax data', () => {
    const tax = {
      amount: 10,
    };
    const validation = validateTax(true, tax);
    expect(validation).toEqual(true);
  });
});

describe('validateNote', () => {
  it('should validate note data', () => {
    const note = {
      content: '',
    };
    const validation = validateNote(true, note);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:note:title'),
      message: i18n.t('dialog:validation:note:message'),
    });
  });

  it('should pass when not required', () => {
    const note = {};
    const validation = validateNote(false, note);
    expect(validation).toEqual(true);
  });

  it('should pass correct note data', () => {
    const note = {
      content: faker.lorem.paragraph(),
    };
    const validation = validateNote(true, note);
    expect(validation).toEqual(true);
  });
});

describe('set correct recipient information to use in edit mode', () => {
  let allContacts;
  beforeEach(() => {
    allContacts = [
      {
        _id: uuidv4(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        company: faker.company.companyName(),
        phone: faker.phone.phoneNumber(),
      },
      {
        _id: uuidv4(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        company: faker.company.companyName(),
        phone: faker.phone.phoneNumber(),
      },
      {
        _id: uuidv4(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        company: faker.company.companyName(),
        phone: faker.phone.phoneNumber(),
      },
    ];
  });

  it('should return current contact if it exist', () => {
    const currentContact = allContacts[1];
    const editRecipient = setEditRecipient(allContacts, currentContact);
    expect(editRecipient).toEqual({
      newRecipient: false,
      select: currentContact,
    });
  });

  it('should create a new contact if the current contact does not exist', () => {
    const currentContact = {
      _id: 'random-string',
      fullname: faker.name.findName(),
      email: faker.internet.email(),
      company: faker.company.companyName(),
      phone: faker.phone.phoneNumber(),
    };
    const editRecipient = setEditRecipient(allContacts, currentContact);
    expect(editRecipient).toEqual({
      newRecipient: true,
      new: {
        fullname: currentContact.fullname,
        email: currentContact.email,
        company: currentContact.company,
        phone: currentContact.phone,
      },
    });
  });
});
