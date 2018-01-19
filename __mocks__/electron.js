module.exports = {
  app: jest.fn(),
  ipcRenderer: {
    send: jest.fn(),
    on: jest.fn(),
  },
  remote: {
    require: jest.fn(name => {
      if (name === 'electron-settings') {
        return {
          set: jest.fn(),
          get: jest.fn(() => 'someSettings'),
        };
      }
    }),
  },
};
