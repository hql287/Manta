module.exports = {
  validateFormData: jest.fn(currentFormData => currentFormData.validation),
  getInvoiceData: jest.fn(),
};
