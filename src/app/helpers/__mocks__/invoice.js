module.exports = {
  getInvoiceValue: jest.fn(() => ({
    subtotal: 'subTotal',
    grandTotal: 'grandTotal',
  })),
};
