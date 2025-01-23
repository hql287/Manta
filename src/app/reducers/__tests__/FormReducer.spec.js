import FormReducer, {
  getCurrentInvoice,
  getRows,
  getRecipient,
} from '../FormReducer';
import * as ACTION_TYPES from '../../constants/actions.jsx';
import currencies from '../../../libs/currencies.json';

import uuidv4 from 'uuid/v4';
import faker from 'faker';
import { pick } from 'lodash';

describe('Form Reducer should handle', () => {
  let currentState;
  beforeEach(() => {
    currentState = {
      rows: [
        { id: 'Jon Snow' },
        { id: 'Daenerys Targaryen' },
        { id: 'Tyrion Lannister' },
        { id: 'Arya Stark' },
      ],
      dueDate: {
        selectedDate: null,
        paymentTerm: null,
        useCustom: true,
      },
      note: {},
      currency: {
        code: 'USD',
        fraction: 2,
        placement: 'before',
        separator: 'commaDot'
      },
      discount: {},
      tax: {},
      settings: {
        open: true,
        required_fields: {},
      },
      savedSettings: {
        tax: {},
        currency: {
          code: 'USD',
          fraction: 2,
          placement: 'before',
          separator: 'commaDot'
        },
        required_fields: {},
      },
    };
  });

  it('adding a row item', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_ITEM_ADD,
    });
    expect(newState.rows).toHaveLength(5);
  });

  it('remove a row item', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_ITEM_REMOVE,
      payload: 'Arya Stark',
    });
    expect(newState.rows).toHaveLength(3);
  });

  it('update a row item', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_ITEM_UPDATE,
      payload: {
        id: 'Tyrion Lannister',
        description: 'The Lannisters always pay their debts',
      },
    });
    expect(newState.rows[2].description).toEqual(
      'The Lannisters always pay their debts'
    );
  });

  it('drag row item', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_ITEM_MOVE,
      payload: {
        dragIndex: 2,
        hoverIndex: 3,
      },
    });
    expect(newState.rows).toHaveLength(4);
    expect(newState.rows).toEqual([
      { id: 'Jon Snow' },
      { id: 'Daenerys Targaryen' },
      { id: 'Arya Stark' },
      { id: 'Tyrion Lannister' },
    ]);
  });

  it('clear the form', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_CLEAR,
    });
    expect(newState.recipient).toEqual({
      newRecipient: true,
      select: {},
      new: {},
    });
    expect(newState.rows).toHaveLength(0);
    expect(newState.dueDate).toEqual({
      selectedDate: null,
      paymentTerm: null,
      useCustom: true,
    });
    expect(newState.note).toEqual({});
    expect(newState.currency).toEqual({
      code: 'USD',
      fraction: 2,
      placement: 'before',
      separator: 'commaDot'
    });
    expect(newState.discount).toEqual({});
    expect(newState.tax).toEqual({});
    expect(newState.settings.open).toEqual(false);
  });

  it('toggle the form settings', () => {
    const newState1 = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_SETTING_TOGGLE,
    });
    expect(newState1.settings.open).toEqual(false);
    const newState2 = FormReducer(newState1, {
      type: ACTION_TYPES.FORM_SETTING_TOGGLE,
    });
    expect(newState2.settings.open).toEqual(true);
  });

  it('close the form settings', () => {
    // Close It
    const newState1 = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_SETTING_CLOSE,
    });
    expect(newState1.settings.open).toEqual(false);
    // Close Again
    const newState2 = FormReducer(newState1, {
      type: ACTION_TYPES.FORM_SETTING_CLOSE,
    });
    expect(newState2.settings.open).toEqual(false);
  });
});

describe('Form Reducer should handle toggle', () => {
  let currentState;
  beforeEach(() => {
    currentState = {
      dueDate: {},
      currency: {},
      discount: {},
      tax: {},
      note: {},
      settings: {
        required_fields: {
          dueDate: false,
          currency: false,
          discount: false,
          tax: false,
          note: false,
        },
      },
    };
  });

  it('currency field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'currency',
    });
    expect(newState.settings.required_fields.currency).toBe(true);
  });

  it('dueDate field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'dueDate',
    });
    expect(newState.settings.required_fields.dueDate).toBe(true);
  });

  it('discount field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'discount',
    });
    expect(newState.settings.required_fields.discount).toBe(true);
  });

  it('note field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'note',
    });
    expect(newState.settings.required_fields.note).toBe(true);
  });

  it('tax field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'tax',
    });
    expect(newState.settings.required_fields.tax).toBe(true);
  });
});

describe('Form Reducer should handle update', () => {
  let currentState;
  beforeEach(() => {
    currentState = {
      dueDate: { required: true },
      currency: { required: true },
      discount: { required: true },
      tax: { required: true },
      note: { required: true },
    };
  });

  it('recipient data', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_RECIPIENT_UPDATE,
      payload: {
        newRecipient: false,
        select: {
          fullname: 'Jon Snow',
          company: 'HBO',
          email: 'jon@snow.got',
          phone: '000000000',
        },
        new: {},
      },
    });
    expect(newState.recipient.newRecipient).toBe(false);
    expect(newState.recipient.select).toEqual({
      fullname: 'Jon Snow',
      company: 'HBO',
      email: 'jon@snow.got',
      phone: '000000000',
    });
    expect(newState.recipient.select).not.toEqual({
      fullname: 'Dany',
      company: 'HBO',
      email: 'mother@dragons.got',
      phone: '111111111',
    });
  });

  it('currency data', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
      payload: {
        field: 'currency',
        data: {
          selectedCurrency: {
            symbol: '$',
            name: 'US Dollar',
            symbol_native: '$',
            decimal_digits: 2,
            rounding: 0,
            code: 'USD',
            name_plural: 'US dollars',
          },
        },
      },
    });
    expect(newState.currency.selectedCurrency.code).not.toEqual('VND');
    expect(newState.currency.selectedCurrency.code).toEqual('USD');
  });

  it('dueDate data', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
      payload: {
        field: 'dueDate',
        data: {
          selectedDate: '28/07/1988',
        },
      },
    });
    expect(newState.dueDate.selectedDate).toEqual('28/07/1988');
  });

  it('discount data', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
      payload: {
        field: 'discount',
        data: {
          type: 'percentage',
          amount: 10,
        },
      },
    });
    expect(newState.discount.type).toEqual('percentage');
    expect(newState.discount.type).not.toEqual('flat');
    expect(newState.discount.amount).toEqual(10);
    expect(newState.discount.amount).not.toEqual(5);
  });

  it('tax data', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
      payload: {
        field: 'tax',
        data: {
          amount: 5,
        },
      },
    });
    expect(newState.tax.amount).toEqual(5);
    expect(newState.tax.amount).not.toEqual(10);
  });

  it('note data', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
      payload: {
        field: 'note',
        data: {
          content: 'You know nothing, Jon Snow',
        },
      },
    });
    expect(newState.note.content).toEqual('You know nothing, Jon Snow');
    expect(newState.note.content).not.toEqual(
      'The Lannisters always pay their debts'
    );
  });
});

describe('Form Reducer should handle Invoice Edit', () => {
  let currentState, invoiceData, newState;
  beforeEach(() => {
    currentState = {
      recipient: {
        newRecipient: true,
        select: {},
        new: {},
      },
      rows: [],
      dueDate: {},
      discount: {},
      note: {},
      currency: {
        code: 'USD',
        decimal_digits: 2,
        name: 'US Dollar',
        name_plural: 'US dollars',
        rounding: 0,
        symbol: '$',
        symbol_native: '$',
      },
      tax: {
        amount: 10,
        method: 'default',
        tin: '123-456-789',
      },
      settings: {
        open: false,
        editMode: {
          active: false,
        },
        required_fields: {
          dueDate: false,
          currency: false,
          discount: false,
          tax: false,
          note: false,
        },
      },
      savedSettings: {
        currency: 'VND',
      },
    };

    invoiceData = {
      contacts: [
        {
          _id: 'first-contact',
          fullname: faker.name.findName(),
          email: faker.internet.email(),
          company: faker.company.companyName(),
          phone: faker.phone.phoneNumber(),
        },
        {
          _id: 'second-contact',
          fullname: faker.name.findName(),
          email: faker.internet.email(),
          company: faker.company.companyName(),
          phone: faker.phone.phoneNumber(),
        },
        {
          _id: 'third-contact',
          fullname: faker.name.findName(),
          email: faker.internet.email(),
          company: faker.company.companyName(),
          phone: faker.phone.phoneNumber(),
        },
      ],
      recipient: {
        _id: 'random-string',
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        company: faker.company.companyName(),
        phone: faker.phone.phoneNumber(),
      },
      rows: [
        {
          id: '16bf1a07-71e6-4be4-8a18-d89a715bd191',
          description: 'iPhone X',
          price: 999,
          quantity: 1,
          subtotal: 999,
        },
      ],
      currency: {
        code: 'USD',
        decimal_digits: 2,
        name: 'US Dollar',
        name_plural: 'US dollars',
        rounding: 0,
        symbol: '$',
        symbol_native: '$',
      },
      tax: {
        amount: 5,
        method: 'reverse-charge',
        tin: '555-444-333',
      },
      dueDate: {
        date: 1,
        hours: 12,
        milliseconds: 0,
        minutes: 0,
        months: 1,
        seconds: 0,
        years: 2018,
      },
      discount: {
        amount: 5,
        type: 'percentage',
      },
      note: 'Thank you!',
    };

    newState = FormReducer(currentState, {
      type: ACTION_TYPES.INVOICE_EDIT,
      payload: invoiceData,
    });
  });

  it('change editMode to true and add editData', () => {
    expect(newState.settings.editMode.active).toEqual(true);
    expect(newState.settings.editMode.data).toEqual(invoiceData);
  });

  it('should populate recipient field data correctly', () => {
    const invoiceData2 = Object.assign({}, invoiceData, {
      recipient: invoiceData.contacts[0]
    })
    const newState2 = FormReducer(currentState, {
      type: ACTION_TYPES.INVOICE_EDIT,
      payload: invoiceData2,
    });
    expect(newState2.recipient.newRecipient).toEqual(false);
    expect(newState2.recipient.select).toEqual(invoiceData2.recipient);
  })

  it('should create a new contact in form if all contacts are deleted', () => {
    expect(newState.recipient.newRecipient).toEqual(true);
    expect(newState.recipient.new).toEqual(
      pick(invoiceData.recipient, ['fullname', 'company', 'phone', 'email'])
    );
  });

  it('should populate other fields data correctly', () => {
    // Rows
    expect(newState.rows.length).toEqual(1);
    expect(newState.rows).toEqual(invoiceData.rows);
    // Tax
    expect(newState.tax).toEqual(invoiceData.tax);
    // Currency
    expect(newState.currency).toEqual(invoiceData.currency);
    // Note
    expect(newState.note.content).toEqual(invoiceData.note);
    // Discount
    expect(newState.discount).toEqual(invoiceData.discount);
    // DueDate
    expect(newState.dueDate).toEqual(invoiceData.dueDate);
  });

  it('toggle optional field if necessary', () => {
    const { required_fields } = newState.settings;
    expect(required_fields.tax).toEqual(invoiceData.tax !== undefined);
    expect(required_fields.dueDate).toEqual(invoiceData.dueDate !== undefined);
    expect(required_fields.discount).toEqual(
      invoiceData.discount !== undefined
    );
    expect(required_fields.note).toEqual(invoiceData.note !== undefined);
  });

  it('should only show currency field if it is different than default', () => {
    const currentCurrencyCode = newState.currency.code;
    const savedCurrencyCode = newState.savedSettings.currency;
    expect(newState.settings.required_fields.currency).toEqual(
      currentCurrencyCode !== savedCurrencyCode
    );
  });
});

describe('Form Reducer should handle update Settings', () => {
  let currentState, newState;
  beforeEach(() => {
    currentState = {
      recipient: {
        newRecipient: true,
        select: {},
        new: {},
      },
      rows: [],
      savedSettings: {
        tax: {
          amount: 10,
          method: 'default',
          tin: '123-456-789',
        },
        currency: 'USD',
        required_fields: {
          dueDate: false,
          currency: false,
          discount: false,
          tax: false,
          note: false,
        },
      },
    };
    newState = FormReducer(currentState, {
      type: ACTION_TYPES.SAVED_FORM_SETTING_UPDATE,
      payload: {
        tax: {
          amount: 5,
          method: 'reverse',
          tin: '111-111-111',
        },
        currency: 'VND',
        required_fields: {
          dueDate: true,
          currency: true,
          discount: true,
          tax: true,
          note: true,
        },
      },
    });
  });

  it('should save default tax value', () => {
    expect(newState.savedSettings.tax).toEqual({
      amount: 5,
      method: 'reverse',
      tin: '111-111-111',
    });
  });

  it('should save default currency value', () => {
    expect(newState.savedSettings.currency).toEqual('VND');
  });

  it('should save default visibility value', () => {
    expect(newState.savedSettings.required_fields).toEqual({
      dueDate: true,
      currency: true,
      discount: true,
      tax: true,
      note: true,
    });
  });
});

// Test Selectors
const state = {
  form: {
    rows: [],
    recipient: {},
  },
};

describe('Form Selectors', () => {
  it('getRows should return form rows', () => {
    expect(getRows(state)).toEqual(state.form.rows);
  });
  it('getRecipient should return form recipient', () => {
    expect(getRecipient(state)).toEqual(state.form.recipient);
  });
  it('getCurrentInvoice should return form state', () => {
    expect(getCurrentInvoice(state)).toEqual(state.form);
  });
});
