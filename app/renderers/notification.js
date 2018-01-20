// 3rd Party Libs
const appConfig = require('electron-settings');

// Icon
// const icon = appConfig.get('logo')
const icon = require('../../static/imgs/manta-logo.png')

const notification = (title, body) => {
  const permission = appConfig.get('general.notification')

  if (permission) {
    const options = {
      icon,
      body
    }
    const notify = new Notification(title, options)
  }

}
module.exports = notification
