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
  let formattedNumber = number;
  formattedNumber = formattedNumber.replace(/\./, decimalSeparator);
  formattedNumber = formattedNumber.replace(/,/g, thousandsSeparator);
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
