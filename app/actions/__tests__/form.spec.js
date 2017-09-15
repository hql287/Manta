import * as ACTION_TYPES from '../../constants/actions';
import * as actions from '../form';

// Recipient
it('updateRecipient should create UPDATE_RECIPIENT action', () => {
  const recipientData = {
    fullname: 'Jon Snow',
    email: 'jon@snow.hbo',
  };
  expect(actions.updateRecipient(recipientData)).toEqual({
    type: ACTION_TYPES.FORM_RECIPIENT_UPDATE,
    data: recipientData,
  });
});

// ItemsRow
it('addItem should create ADD_ITEM action', () => {
  expect(actions.addItem()).toEqual({
    type: ACTION_TYPES.FORM_ITEM_ADD,
  });
});

it('removeItem should create REMOVE_ITEM action', () => {
  expect(actions.removeItem('jon_snow')).toEqual({
    type: ACTION_TYPES.FORM_ITEM_REMOVE,
    id: 'jon_snow',
  });
});

it('updateItem should create UPDATE_ITEM action', () => {
  const itemData = {
    description: 'Chocolate Cookies',
    price: 10,
    quantity: 10
  }
  expect(actions.updateItem(itemData)).toEqual({
    type: ACTION_TYPES.FORM_ITEM_UPDATE,
    data: itemData,
  });
});

it('moveRow should create MOVE_ROW action', () => {
  expect(actions.moveRow(2,3)).toEqual({
    type: ACTION_TYPES.FORM_ITEM_MOVE,
    dragIndex: 2,
    hoverIndex: 3,
  });
});

// Form Actions
it('clearForm should create CLEAR_FORM action', () => {
  expect(actions.clearForm('muted')).toEqual({
    type: ACTION_TYPES.FORM_CLEAR,
    payload: { vol: 'muted' }
  });
});

it('updateFieldData should create UPDATE_FIELD_DATA action', () => {
  const field = 'dueDate';
  const data = '28/07/1988';
  expect(actions.updateFieldData(field, data)).toEqual({
    type: ACTION_TYPES.FORM_FIELD_UPDATE_DATA,
    field,
    data,
  });
});

it('toggleField should create TOGGLE_FIELD action', () => {
  expect(actions.toggleField('dueDate')).toEqual({
    type: ACTION_TYPES.FORM_FIELD_TOGGLE,
    field: 'dueDate'
  });
  expect(actions.toggleField('currency')).toEqual({
    type: ACTION_TYPES.FORM_FIELD_TOGGLE,
    field: 'currency'
  });
  expect(actions.toggleField('discount')).toEqual({
    type: ACTION_TYPES.FORM_FIELD_TOGGLE,
    field: 'discount'
  });
  expect(actions.toggleField('vat')).toEqual({
    type: ACTION_TYPES.FORM_FIELD_TOGGLE,
    field: 'vat'
  });
  expect(actions.toggleField('note')).toEqual({
    type: ACTION_TYPES.FORM_FIELD_TOGGLE,
    field: 'note'
  });
});
