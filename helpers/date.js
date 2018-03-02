function calTermDate(createdAt, adjustment) {
  const createdDate = new Date(createdAt);
  let numberOfDaysToAdd;
  switch (adjustment) {
    case 'net10': {
      numberOfDaysToAdd = 10;
      break;
    }
    case 'net30': {
      numberOfDaysToAdd = 30;
      break;
    }
    case 'net60': {
      numberOfDaysToAdd = 60;
      break;
    }
    case 'net90': {
      numberOfDaysToAdd = 90;
      break;
    }
    default: {
      numberOfDaysToAdd = 7;
      break;
    }
  }
  const paymentTermDate = new Date();
  return paymentTermDate.setDate(createdDate.getDate() + numberOfDaysToAdd);
}

export { calTermDate };
