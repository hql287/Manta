// Calculate Subtotal
const getSubtotal = data => {
  // Set all subtotal
  let subtotal = 0;
  data.rows.forEach(row => {
    subtotal += row.subtotal;
  });
  return subtotal;
};

// Calculate Grand Total
const getGrandTotal = data => {
  let grandTotal = getSubtotal(data);
  // Apply Discount
  if (data.discount) {
    if (data.discount.type === 'percentage') {
      grandTotal = grandTotal * (100 - data.discount.amount) / 100;
    } else {
      grandTotal = grandTotal - data.discount.amount;
    }
  }
  // Apply VAT
  if (data.vat) {
    const vatValue = grandTotal * data.vat / 100;
    grandTotal = grandTotal + vatValue;
  }
  return grandTotal;
};

export {
  getSubtotal,
  getGrandTotal,
}
