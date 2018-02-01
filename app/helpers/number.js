const appConfig = require('electron').remote.require('electron-settings');
import * as UIActions from '../actions/ui';
import { createAction } from 'redux-actions';

function roundValue(value) {
  // This variable my get value from setting in future version
  const decimals = 2;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function localeOrDefault(locale) {
  let usedLocale = locale;

  console.log('Config: ', appConfig.get('general.language'));
  if (!usedLocale || usedLocale === undefined) {
    usedLocale = appConfig.get('general.language') || 'en';
  }
}

function replaceSeparators(formatted, decimalSeparator, thousandsSeparator) {
  let formattedNumber = formatted;
  if (decimalSeparator) {
    formattedNumber = formattedNumber.replace(/\./, decimalSeparator);
  }
  if (thousandsSeparator) {
    formattedNumber = formattedNumber.replace(/,/g, thousandsSeparator);
  }

  return formattedNumber;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

function formatNumber(number) {
  // use en-us as locale to have the same separator and savely replace it
  const usedLocale = 'en';
  let fractions = appConfig.get('invoice.decimalFractions') || 2;
  if (!isNumber(fractions) || fractions < 0) {
    fractions = 2;
  }
  const decimalSeparatorConfig = appConfig.get('invoice.decimalSeparator') || 'dot';

  let decimalSeparator = '.';
  let replaceThousandsSeparator = false;

  if (decimalSeparatorConfig === 'comma') {
    decimalSeparator = ',';
    replaceThousandsSeparator = true;
  }

  const formattedNumber = roundValue(number).toLocaleString(usedLocale, {
    minimumFractionDigits: fractions,
    maximumFractionDigits: fractions
  });

  const outputNumber = replaceSeparators(formattedNumber, decimalSeparator, replaceThousandsSeparator ? ',' : '');
  
  return outputNumber;
}

export { formatNumber };
