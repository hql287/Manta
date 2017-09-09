import * as ACTION_TYPES from '../../constants/actions';
import * as actions from '../form';

// Recipient
it('updateRecipient should create UPDATE_RECIPIENT action', () => {
  const recipientData = {
    fullname: 'Jon Snow',
    email: 'jon@snow.hbo',
  };
  expect(actions.updateRecipient(recipientData)).toEqual({
    type: ACTION_TYPES.UPDATE_RECIPIENT,
    data: recipientData,
  });
});

// ItemsRow
it('addItem should create ADD_ITEM action', () => {
  expect(actions.addItem()).toEqual({
    type: ACTION_TYPES.ADD_ITEM,
  });
});

it('removeItem should create REMOVE_ITEM action', () => {
  expect(actions.removeItem('jon_snow')).toEqual({
    type: ACTION_TYPES.REMOVE_ITEM,
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
    type: ACTION_TYPES.UPDATE_ITEM,
    data: itemData,
  });
});

it('moveRow should create MOVE_ROW action', () => {
  expect(actions.moveRow(2,3)).toEqual({
    type: ACTION_TYPES.MOVE_ROW,
    dragIndex: 2,
    hoverIndex: 3,
  });
});

// Form Actions
it('clearForm should create CLEAR_FORM action', () => {
  expect(actions.clearForm()).toEqual({
    type: ACTION_TYPES.CLEAR_FORM,
  });
});

it('updateFieldData should create UPDATE_FIELD_DATA action', () => {
  const field = 'dueDate';
  const data = '28/07/1988';
  expect(actions.updateFieldData(field, data)).toEqual({
    type: ACTION_TYPES.UPDATE_FIELD_DATA,
    field,
    data,
  });
});

it('toggleField should create TOGGLE_FIELD action', () => {
  expect(actions.toggleField('dueDate')).toEqual({
    type: ACTION_TYPES.TOGGLE_FIELD,
    field: 'dueDate'
  });
  expect(actions.toggleField('currency')).toEqual({
    type: ACTION_TYPES.TOGGLE_FIELD,
    field: 'currency'
  });
  expect(actions.toggleField('discount')).toEqual({
    type: ACTION_TYPES.TOGGLE_FIELD,
    field: 'discount'
  });
  expect(actions.toggleField('vat')).toEqual({
    type: ACTION_TYPES.TOGGLE_FIELD,
    field: 'vat'
  });
  expect(actions.toggleField('note')).toEqual({
    type: ACTION_TYPES.TOGGLE_FIELD,
    field: 'note'
  });
});
