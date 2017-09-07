import * as ACTION_TYPES from '../constants/actions.jsx';

const initialState = {
  activeTab: 'form'
};

const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Initial Settings
    case ACTION_TYPES.UI_CHANGE_TAB: {
      return Object.assign({}, state, {
        activeTab: action.payload,
      });
    }
    // Default Case
    default: {
      return state;
    }
  }
};

export default UIReducer;
