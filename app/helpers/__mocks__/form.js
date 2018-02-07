module.exports = {
  validateFormData: jest.fn(currentFormData => currentFormData.validation),
  validateCurrency: jest.fn((required, currency) => true),
  validateTax: jest.fn((required, currency) => true),
  getInvoiceData: jest.fn(currentFormData => currentFormData),
};
