import * as ACTION_TYPES from '../constants/actions.jsx';

// Get All Receipts
export const setReceipt = receiptdata => {
  return {
    type: ACTION_TYPES.SET_RECEIPT,
    data: receiptdata,
  };
};
