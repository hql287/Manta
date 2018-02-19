function setSeparator(separator) {
  const separatorFormat = {};
  switch (separator) {
    case 'commaDot': {
      separatorFormat.thousand = ',';
      separatorFormat.decimal = '.';
      break;
    }
    case 'dotComma': {
      separatorFormat.thousand = '.';
      separatorFormat.decimal = ',';
      break;
    }
    default: {
      separatorFormat.thousand = ' ';
      separatorFormat.decimal = '.';
      break;
    }
  }
  return separatorFormat;
}

function replaceSeparators(number, decimalSeparator, thousandsSeparator) {
  const formattedNumber = number.replace(
    /[,.]/g,
    n => (n === ',' ? thousandsSeparator : decimalSeparator)
  );
  return formattedNumber;
}

function formatNumber(number, fraction, separator) {
  const defaultFormattedNumber = number.toLocaleString('en', {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });
  const separatorFormat = setSeparator(separator);
  const formattedNumber = replaceSeparators(
    defaultFormattedNumber,
    separatorFormat.decimal,
    separatorFormat.thousand
  );
  return formattedNumber;
}

export { formatNumber };
