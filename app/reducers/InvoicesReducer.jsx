import * as ACTION_TYPES from '../constants/actions.jsx';
import {handleActions} from 'redux-actions';

const initialState = {
  loaded: false,
  data: [],
};

const InvoicesReducer = handleActions(
  {
    [ACTION_TYPES.INVOICE_GET_ALL]: (state, action) =>
      Object.assign({}, state, {
        loaded: true,
        data: action.payload,
      }),
    [ACTION_TYPES.INVOICE_SAVE]: (state, action) =>
      Object.assign({}, state, {
        data: action.payload,
      }),
    [ACTION_TYPES.INVOICE_DELETE]: (state, action) =>
      Object.assign({}, state, {
        data: action.payload,
      }),
  },
  initialState
);

export default InvoicesReducer;
