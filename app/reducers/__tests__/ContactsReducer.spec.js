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
        type: ACTION_TYPES.GET_ALL_CONTACTS,
        data: allDocs,
      }),
    ).toEqual(
      Object.assign({}, initialState, {
        loaded: true,
        data: allDocs,
      }),
    );
  });

  it('should handle get one contact', () => {
    const doc = {_id: 2, name: 'Ned Stark'};
    expect(
      ContactsReducer(initialState, {
        type: ACTION_TYPES.GET_ONE_CONTACT,
        data: doc,
      }),
    ).toEqual(
      Object.assign({}, initialState, {
        data: doc,
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
        type: ACTION_TYPES.SAVE_CONTACT,
        data: newDocs,
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
        type: ACTION_TYPES.DELETE_CONTACT,
        data: remainingDocs,
      }),
    ).toEqual(
      Object.assign({}, initialState, {
        data: remainingDocs,
      }),
    );
  });
});
