import ContactsReducer from '../ContactsReducer';
import * as ACTION_TYPES from '../../constants/actions.jsx';

const initialState = {loaded: false, data: []};

describe('Contacts Reducer', () => {
  it('should handle initial state', () => {
    expect(ContactsReducer(undefined, {})).toEqual({
      loaded: false,
      data: [],
    });
  });

  it('should handle get all contacts', () => {
    const allDocs = [{_id: 1, name: 'Jon Snow'}, {_id: 2, name: 'Ned Stark'}];
    expect(
      ContactsReducer(initialState, {
        type: ACTION_TYPES.CONTACT_GET_ALL,
        payload: allDocs,
      }),
    ).toEqual(
      Object.assign({}, initialState, {
        loaded: true,
        data: allDocs,
      }),
    );
  });

  it('should handle save contact', () => {
    const newDocs = [
      {_id: 1, name: 'Jon Snow'},
      {_id: 2, name: 'Ned Stark'},
      {_id: 3, name: 'Dany'},
    ];
    expect(
      ContactsReducer(initialState, {
        type: ACTION_TYPES.CONTACT_SAVE,
        payload: newDocs,
      }),
    ).toEqual(
      Object.assign({}, initialState, {
        data: newDocs,
      }),
    );
  });

  it('should handle get delete contact', () => {
    const remainingDocs = [
      {_id: 1, name: 'Jon Snow'},
      {_id: 3, name: 'Dany'},
    ];
    expect(
      ContactsReducer(initialState, {
        type: ACTION_TYPES.CONTACT_DELETE,
        payload: remainingDocs,
      }),
    ).toEqual(
      Object.assign({}, initialState, {
        data: remainingDocs,
      }),
    );
  });
});
