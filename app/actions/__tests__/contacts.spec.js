import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as actions from '../contacts';

it('getAllContacts should create GET_ALL_CONTACTS action', () => {
  expect(actions.getAllContacts()).toEqual({
    type: ACTION_TYPES.GET_ALL_CONTACTS,
  });
});

it('getOneContact should create GET_ONE_CONTACT action', () => {
  expect(actions.getOneContact('jon_snow')).toEqual({
    type: ACTION_TYPES.GET_ONE_CONTACT,
    _id: 'jon_snow',
  });
});

it('saveContact should create SAVE_CONTACT action', () => {
  const contactData = {
    _id: 'jon_snow',
    fulname: 'Jon Snow',
    email: 'jon@snow.got',
  };
  expect(actions.saveContact(contactData)).toEqual({
    type: ACTION_TYPES.SAVE_CONTACT,
    data: contactData,
  });
});

it('deleteContact should create DELETE_CONTACT action', () => {
  expect(actions.deleteContact('jon_snow')).toEqual({
    type: ACTION_TYPES.DELETE_CONTACT,
    _id: 'jon_snow',
  });
});
