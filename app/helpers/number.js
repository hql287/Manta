function roundValue(value) {
  // This variable my get value from setting in future version
  const decimals = 2;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function formatNumber(number) {
  return roundValue(number).toLocaleString();
}

export { formatNumber };
