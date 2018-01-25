const appConfig = require('electron').remote.require('electron-settings');

function roundValue(value) {
  // This variable my get value from setting in future version
  const decimals = 2;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function formatNumber(number, locale) {
  if (!locale) {
    locale = appConfig.get('general.language') || 'en';
  }
  return roundValue(number).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export { formatNumber };
