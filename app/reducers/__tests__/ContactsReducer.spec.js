import ContactsReducer from '../ContactsReducer';
import * as ACTION_TYPES from '../../constants/actions.jsx';
import faker from 'faker';
import uuidv4 from 'uuid/v4';

const initialState = [];

describe('Contacts Reducer', () => {
  it('should handle initial state', () => {
    expect(ContactsReducer(undefined, {})).toEqual([]);
  });

  let docs;
  beforeEach(()=> {
    docs = [
      { id: uuidv4(), name: faker.name.findName() },
      { id: uuidv4(), name: faker.name.findName() },
      { id: uuidv4(), name: faker.name.findName() },
    ];
  });

  it('should handle get all contacts', () => {
    expect(
      ContactsReducer(initialState, {
        type: ACTION_TYPES.CONTACT_GET_ALL,
        payload: docs,
      })
    ).toEqual(docs);
  });

  it('should handle save contact', () => {
    expect(
      ContactsReducer(initialState, {
        type: ACTION_TYPES.CONTACT_SAVE,
        payload: docs,
      })
    ).toEqual(docs);
  });

  it('should handle get delete contact', () => {
    expect(
      ContactsReducer(initialState, {
        type: ACTION_TYPES.CONTACT_DELETE,
        payload: docs,
      })
    ).toEqual(docs);
  });
});
