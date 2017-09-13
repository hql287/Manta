import * as ACTION_TYPES from '../constants/actions.jsx';
import sounds from '../../libs/sounds';

const UIMiddleware = () => next => action => {
  switch (action.type) {
    // Changing Tabs
    case ACTION_TYPES.UI_TAB_CHANGE: {
      sounds.play('TAP');
      next(action);
      break;
    }

    // New Notification
    case ACTION_TYPES.UI_NOTIFICATION_NEW: {
      switch (action.payload.type) {
        case 'success': {
          sounds.play('SUCCESS');
          break;
        }
        case 'warning': {
          sounds.play('WARNING');
          break;
        }
      }
      next(action);
      break;
    }

    // OTHERS ACTIONS
    case ACTION_TYPES.FORM_ITEM_ADD: {
      sounds.play('ADD');
      next(action);
      break;
    }

    case ACTION_TYPES.FORM_ITEM_REMOVE: {
      sounds.play('REMOVE');
      next(action);
      break;
    }

    case ACTION_TYPES.FORM_CLEAR: {
      sounds.play('RELOAD');
      next(action);
      break;
    }

    // Default
    default: {
      next(action);
      break;
    }
  }
};

export default UIMiddleware;
