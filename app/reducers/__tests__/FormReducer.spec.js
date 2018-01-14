import FormReducer, {
  getCurrentInvoice,
  getRows,
  getRecipient,
} from '../FormReducer';
import * as ACTION_TYPES from '../../constants/actions.jsx';
import { All as currencies } from '../../../../libs/currencies.js';

import uuidv4 from 'uuid/v4';

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
      dueDate: {},
      note: {},
      currency: {},
      discount: {},
      tax: {},
      settings: {
        open: true,
        required_fields: {},
      },
      savedSettings: {
        tax: {},
        currency: 'USD',
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
    expect(newState.dueDate).toEqual({});
    expect(newState.note).toEqual({});
    expect(newState.currency).toEqual(
      currencies[currentState.savedSettings.currency]
    );
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
