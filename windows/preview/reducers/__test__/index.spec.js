import * as ACTION_TYPES from '../../constants/actions.jsx';
import faker from 'faker';
import uuidv4 from 'uuid/v4';
import RootReducer, {
  getConfigs,
  getInvoice,
  getProfile,
  getUILang,
  getInvoiceLang,
} from '../index.jsx';

describe('RootReducer should', () => {
  it('handle INVOICE_UPDATE action', () => {
    const currentState = {
      invoice: {},
      configs: {},
    };
    const newState = RootReducer(currentState, {
      type: ACTION_TYPES.INVOICE_UPDATE,
      payload: {
        invoice: 'invoice',
        configs: 'configs',
      }
    })
    expect(newState.invoice).toEqual({
      invoice: 'invoice',
      configs: 'configs',
    });
    expect(newState.configs).toEqual('configs');
  });

  it('handle UI_CHANGE_LANGUAGE action', () => {
    const currentState = {
      ui: { language: 'en' }
    };
    const newState = RootReducer(currentState, {
      type: ACTION_TYPES.UI_CHANGE_LANGUAGE,
      payload: 'fr'
    })
    expect(newState.ui.language).toEqual('fr');
  });

  it('handle SETTINGS_UPDATE_PROFILE action', () => {
    const currentState = {
      profile: 'Profile'
    };
    const newState = RootReducer(currentState, {
      type: ACTION_TYPES.SETTINGS_UPDATE_PROFILE,
      payload: 'New Profile'
    })
    expect(newState.profile).toEqual('New Profile');
  });

  it('handle SETTINGS_UPDATE_CONFIGS action', () => {
    const currentState = {
      configs: { template: 'minimal' }
    };
    const newState = RootReducer(currentState, {
      type: ACTION_TYPES.SETTINGS_UPDATE_CONFIGS,
      payload: {
        name: 'template',
        value: 'business',
      }
    })
    expect(newState.configs.template).toEqual('business');
  });

  it('handle SETTINGS_RELOAD_CONFIGS action', () => {
    const currentState = {
      profile: 'Profile',
      configs: {
        language: 'fr',
        template: 'minimal',
        dateFormat: 'DDMMYY',
      }
    };
    const newState = RootReducer(currentState, {
      type: ACTION_TYPES.SETTINGS_RELOAD_CONFIGS,
      payload: {
        profile: 'New Profile',
        general: { language: 'en' },
        invoice: {
          dateFormat: 'MMMM/DDDD/YYYY',
          template: 'business',
        }
      }
    })
    expect(newState.profile).toEqual('New Profile');
    expect(newState.configs.language).toEqual('en');
    expect(newState.configs.template).toEqual('business');
    expect(newState.configs.dateFormat).toEqual('MMMM/DDDD/YYYY');
  });
});

describe('Selectors should', () => {
  let state;
  beforeEach(() => {
    state = {
      ui: { language: 'en' },
      configs: { template: 'Business' },
      invoice: { language: 'fr' },
      profile: 'Profile',
    }
  });
  it('getConfigs should return invoice current configs', () => {
    expect(getConfigs(state)).toEqual(state.configs);
  });
  it('getInvoice should return invoice data', () => {
    expect(getInvoice(state)).toEqual(state.invoice);
  });
  it('getProfile should return profile data', () => {
    expect(getProfile(state)).toEqual('Profile');
  });
  it('getUILang should return profile data', () => {
    expect(getUILang(state)).toEqual('en');
  });
  it('getInvoiceLang should return language of the invoice', () => {
    expect(getInvoiceLang(state)).toEqual('fr');
  });
});
