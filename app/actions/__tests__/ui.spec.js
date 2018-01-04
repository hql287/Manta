import * as ACTION_TYPES from '../../constants/actions';
import * as actions from '../ui';

it('changeActiveTab should create UI_TAB_CHANGE action', () => {
  expect(actions.changeActiveTab('form')).toEqual({
    type: ACTION_TYPES.UI_TAB_CHANGE,
    payload: 'form',
  });
  expect(actions.changeActiveTab('invoices')).toEqual({
    type: ACTION_TYPES.UI_TAB_CHANGE,
    payload: 'invoices',
  });
  expect(actions.changeActiveTab('contacts')).toEqual({
    type: ACTION_TYPES.UI_TAB_CHANGE,
    payload: 'contacts',
  });
  expect(actions.changeActiveTab('settings')).toEqual({
    type: ACTION_TYPES.UI_TAB_CHANGE,
    payload: 'settings',
  });
});

it('newNoti should create UI_NOTIFICATION_NEW action', () => {
  const messageType1 = 'warning';
  const messageContent1 = 'Missing Doc';
  expect(actions.newNoti(messageType1, messageContent1)).toEqual({
    type: ACTION_TYPES.UI_NOTIFICATION_NEW,
    payload: {
      type: messageType1,
      message: messageContent1,
    },
  });
  const messageType2 = 'success';
  const messageContent2 = 'Invoice Created Successfully!';
  expect(actions.newNoti(messageType2, messageContent2)).toEqual({
    type: ACTION_TYPES.UI_NOTIFICATION_NEW,
    payload: {
      type: messageType2,
      message: messageContent2,
    },
  });
});

it('removeNoti should create UI_NOTIFICATION_REMOVE action', () => {
  const notificationID = 'asdkja83hadk83basdakhbd';
  expect(actions.removeNoti(notificationID)).toEqual({
    type: ACTION_TYPES.UI_NOTIFICATION_REMOVE,
    payload: notificationID,
  });
});
