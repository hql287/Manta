function setBaseFontSize(level) {
  let size;
  switch (level) {
    case '500': {
      size = '1.175em';
      break;
    }
    case '400': {
      size = '1.1em';
      break;
    }
    case '300': {
      size = '1.025em';
      break;
    }
    case '200': {
      size = '.95em';
      break;
    }
    default: {
      size = '.875em';
      break;
    }
  }
  return size;
}

export { setBaseFontSize };
