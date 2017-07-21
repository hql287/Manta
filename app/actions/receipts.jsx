// Node Libs
const path = require('path');

// 3rd Party Libs
const Datastore = require('nedb');
const receipts_db = new Datastore({
  filename: path.join(__dirname, '../db/receipts.db'),
  autoload: true,
});

import * as ACTION_TYPES from '../constants/actions.jsx';

export const getReceipts = () => {
  return dispatch => {
    receipts_db.find({}, function(err, receipts) {
      dispatch({
        type: ACTION_TYPES.GET_RECEIPTS,
        receipts,
      });
    });
  };
};

export const saveReceipt = data => {
  return dispatch => {
    receipts_db.insert(data, function(err, savedReceipt) {
      receipts_db.find({}, function(err, allReceipts) {
        dispatch({
          type: ACTION_TYPES.SAVE_RECEIPT,
          allReceipts,
        });
      });
    });
  };
};

export const deleteReceipt = receiptId => {
  return dispatch => {
    receipts_db.remove({_id: receiptId}, {}, function(err, removedReceipt) {
      receipts_db.find({}, function(err, remainingReceipts) {
        dispatch({
          type: ACTION_TYPES.DELETE_RECEIPT,
          remainingReceipts,
        });
      });
    });
  };
};
