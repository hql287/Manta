import FormReducer from '../FormReducer';
import * as ACTION_TYPES from '../../constants/actions.jsx';

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
      ]
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
      payload: 'Arya Stark'
    });
    expect(newState.rows).toHaveLength(3);
  });

  it('update a row item', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_ITEM_UPDATE,
      payload: {
        id: 'Tyrion Lannister',
        description: 'The Lannisters always pay their debts',
      }
    });
    expect(
      newState
      .rows[2]
      .description
    ).toEqual('The Lannisters always pay their debts');
  });

  it('drag row item', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_ITEM_MOVE,
      payload: {
        dragIndex: 2,
        hoverIndex: 3,
      }
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
    expect(newState.dueDate).toEqual({ required: false });
    expect(newState.note).toEqual({ required: false });
    expect(newState.currency).toEqual({ required: false });
    expect(newState.discount).toEqual({ required: false });
    expect(newState.vat).toEqual({ required: false });
  });

  it('toggle the form settings', () => {
    const newState1 = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_SETTING_TOGGLE,
      payload: false,
    });
    expect(newState1.settingsOpen).toEqual(false);
    const currentState = FormReducer(currentState, { type: 'default' });
    const newState2 = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_SETTING_TOGGLE,
      payload: true,
    });
    expect(newState2.settingsOpen).toEqual(!currentState.settingsOpen);
  });

});

describe('Form Reducer should handle toggle', () => {
  let currentState;
  beforeEach(() => {
    currentState = {
      dueDate:  { required: false },
      currency: { required: false },
      discount: { required: false },
      vat:      { required: false },
      note:     { required: false },
    };
  });

  it('currency field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'currency',
    });
    expect(newState.currency.required).toBe(true);
  });

  it('dueDate field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'dueDate',
    });
    expect(newState.dueDate.required).toBe(true);
  });

  it('discount field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'discount',
    });
    expect(newState.discount.required).toBe(true);
  });

  it('note field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'note',
    });
    expect(newState.note.required).toBe(true);
  });

  it('vat field', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_TOGGLE,
      payload: 'vat',
    });
    expect(newState.vat.required).toBe(true);
  });


});

describe('Form Reducer should handle update', () => {
  let currentState;
  beforeEach(() => {
    currentState = {
      dueDate:  { required: true },
      currency: { required: true },
      discount: { required: true },
      vat:      { required: true },
      note:     { required: true },
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
      }
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
        data: 'VND',
      }
    });
    expect(newState.currency.selectedCurrency).not.toEqual('USD');
    expect(newState.currency.selectedCurrency).toEqual('VND');
  });

  it('dueDate data', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
      payload: {
        field: 'dueDate',
        data: '28/07/1988',
      }
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
        }
      }
    });
    expect(newState.discount.type).toEqual('percentage');
    expect(newState.discount.type).not.toEqual('flat');
    expect(newState.discount.amount).toEqual(10);
    expect(newState.discount.amount).not.toEqual(5);
  });

  it('vat data', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
      payload: {
        field: 'vat',
        data: {
          amount: 5,
        }
      }
    });
    expect(newState.vat.amount).toEqual(5);
    expect(newState.vat.amount).not.toEqual(10);
  });

  it('note data', () => {
    const newState = FormReducer(currentState, {
      type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
      payload: {
        field: 'note',
        data: {
          content: 'You know nothing, Jon Snow',
        }
      }
    });
    expect(newState.note.content).toEqual('You know nothing, Jon Snow');
    expect(newState.note.content).not.toEqual('The Lannisters always pay their debts');
  });

});
