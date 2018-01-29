const appConfig = require('electron').remote.require('electron-settings');

function roundValue(value) {
  // This variable my get value from setting in future version
  const decimals = 2;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function localeOrDefault(locale) {
  let usedLocale = locale;

  if (!usedLocale) {
    usedLocale = appConfig.get('general.language') || 'en';
  }
}

function formatNumber(number, locale) {
  const usedLocale = localeOrDefault(locale);
  const fractions = appConfig.get('invoice.decimalFractions') || 2;
  
  return roundValue(number).toLocaleString(locale, {
    minimumFractionDigits: fractions,
    maximumFractionDigits: fractions
  });
}

export { formatNumber };
