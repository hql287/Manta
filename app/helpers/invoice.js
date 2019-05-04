function getInvoiceValue(data) {
  function calSub(data) {
    return data.rows.reduce((value, row) => value + row.subtotal, 0);
  }

  function calDiscount(data) {
    if (data.discount) {
      if (data.discount.type === 'percentage') {
        const subtotal = calSub(data);
        return subtotal * data.discount.amount / 100;
      }
      return data.discount.amount;
    }
  }

  function calTax(data) {
    const calTaxByMethod = function(amount, tax) {
      let taxAmount = 0;
      switch (tax.method) {
        case 'fixed':
          taxAmount = tax.amount;
          break;

        case 'default':
        default:
          taxAmount = amount * tax.amount / 100;
          break;
      }
      return taxAmount;
    }
    if (data.tax) {
      const subtotal = calSub(data);
      if (data.discount) {
        const discount = calDiscount(data);
        const afterDiscount = subtotal - discount;
        return calTaxByMethod(afterDiscount, data.tax);
      }
      return calTaxByMethod(subtotal, data.tax);
    }
  }

  function calTotal() {
    let grandTotal = calSub(data);
    if (data.discount) {
      const discountAmount = calDiscount(data);
      grandTotal -= discountAmount;
    }
    if (data.tax) {
      const taxAmount = calTax(data);
      switch (data.tax.method) {
        case 'default':
        case 'fixed':
          grandTotal += taxAmount;
          break;
      }
    }
    return grandTotal;
  }

  return {
    subtotal: calSub(data),
    discount: calDiscount(data),
    taxAmount: calTax(data),
    grandTotal: calTotal(),
  };
}

export { getInvoiceValue };
