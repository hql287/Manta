const appConfig = require('electron-settings');

const Notify = options => {
  const permission = appConfig.get('general.notification');

  if (permission) {
    const { title, body } = options;
    return new Notification(title, { body });
  }
};
module.exports = { Notify };
