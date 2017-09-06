import SettingsReducer from '../SettingsReducer';
import * as ACTION_TYPES from '../../constants/actions.jsx';

const sampleSettings = {
  info: {
    logo: '',
    fullname: 'Hung Q. Le',
    company: 'Paperless Co',
    address: 'Ratburana, Bangkok',
    email: 'hi@paperless.co',
    phone: '+66 (0) 6-4890-3611',
    website: 'https://www.paperless.co',
  },
  appSettings: {
    currency: 'USD',
    muted: true,
    sound: 'default',
    lang: 'en',
  },
  printOptions: {
    exportDir: '/Users/quochungle/Desktop',
    template: 'default',
    marginsType: 2,
    pageSize: 'A4',
    printBackground: true,
    printSelectionOnly: false,
    landscape: false,
  },
};

const initialState = {loaded: false};

describe('Settings Reducer', () => {
  it('should handle initial state', () => {
    expect(SettingsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle get initial setting', () => {
    const payload = {
      current: sampleSettings,
      saved: sampleSettings,
    };
    const newState = SettingsReducer(initialState, {
      type: ACTION_TYPES.GET_INITIAL_SETTINGS,
      data: payload,
    });
    expect(newState.loaded).toBeTruthy;
    expect(newState.current).toEqual(sampleSettings);
    expect(newState.saved).toEqual(sampleSettings);
  });

  it('update save settings', () => {
    const payload = sampleSettings;
    const newState = SettingsReducer(initialState, {
      type: ACTION_TYPES.SAVE_SETTINGS,
      data: payload,
    });
    expect(newState.saved).toEqual(payload);
  });
});

describe('Settings Reducer should handle update', () => {
  let currentState;
  beforeAll(() => {
    currentState = {
      loaded: true,
      current: sampleSettings,
      saved: sampleSettings,
    };
  });

  it('app settings', () => {
    const payload = {
      currency: 'VND',
      muted: false,
      sound: 'modern',
      lang: 'vi',
    };
    const newState = SettingsReducer(currentState, {
      type: ACTION_TYPES.UPDATE_SETTINGS,
      setting: 'appSettings',
      data: payload,
    });
    expect(newState.current.appSettings.currency).toEqual('VND');
    expect(newState.current.appSettings.muted).toBeFalsy;
    expect(newState.current.appSettings.sound).toEqual('modern');
    expect(newState.current.appSettings.lang).toEqual('vi');
  });

  it('info settings', () => {
    const payload = {
      fullname: 'Jon Snow',
      company: 'HBO',
      address: 'Winterfell',
      email: 'jon@snow.com',
      website: 'https://iknownothing.com',
    };
    const newState = SettingsReducer(currentState, {
      type: ACTION_TYPES.UPDATE_SETTINGS,
      setting: 'info',
      data: payload,
    });
    expect(newState.current.info.fullname).toEqual('Jon Snow');
    expect(newState.current.info.company).toEqual('HBO');
    expect(newState.current.info.address).toEqual('Winterfell');
    expect(newState.current.info.email).toEqual('jon@snow.com');
    expect(newState.current.info.website).toEqual('https://iknownothing.com');
  });

  it('print settings', () => {
    const payload = {
      template: 'classic',
      pageSize: 'A5',
      printBackground: false,
      printSelectionOnly: false,
      landscape: true,
    };
    const newState = SettingsReducer(currentState, {
      type: ACTION_TYPES.UPDATE_SETTINGS,
      setting: 'printOptions',
      data: payload,
    });
    expect(newState.current.printOptions.template).toEqual('classic');
    expect(newState.current.printOptions.pageSize).toEqual('A5');
    expect(newState.current.printOptions.printBackground).toBeFalsy;
    expect(newState.current.printOptions.printSelectionOnly).toBeFalsy;
    expect(newState.current.printOptions.landscape).toBeTruthy;
  });
});
