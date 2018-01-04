import { getInvoiceValue } from '../invoice';

const data1 = {
  rows: [
    { subtotal: 20 },
    { subtotal: 40 },
    { subtotal: 60 },
    { subtotal: 80 },
  ],
  discount: {
    type: 'flat',
    amount: 100,
  },
  tax: {
    amount: 10,
    method: 'default',
  },
};

const data2 = {
  rows: [
    { subtotal: 10 },
    { subtotal: 30 },
    { subtotal: 50 },
    { subtotal: 70 },
  ],
  discount: {
    type: 'percentage',
    amount: 10,
  },
  tax: {
    amount: 5,
    method: 'reverse',
  },
};

const data3 = {
  rows: [{ subtotal: 50 }, { subtotal: 100 }, { subtotal: 150 }],
};

it('should return correct subtotal value', () => {
  expect(getInvoiceValue(data1).subtotal).toEqual(200);
  expect(getInvoiceValue(data1).subtotal).not.toEqual(100);
  expect(getInvoiceValue(data2).subtotal).toEqual(160);
  expect(getInvoiceValue(data2).subtotal).not.toEqual(180);
  expect(getInvoiceValue(data3).subtotal).toEqual(300);
  expect(getInvoiceValue(data3).subtotal).not.toEqual(310);
});

it('should return correct discount', () => {
  expect(getInvoiceValue(data1).discount).toEqual(100);
  expect(getInvoiceValue(data1).discount).not.toEqual(200);
  expect(getInvoiceValue(data2).discount).toEqual(16);
  expect(getInvoiceValue(data2).discount).not.toEqual(18);
  expect(getInvoiceValue(data3).discount).toEqual(undefined);
});

it('should return correct tax value', () => {
  expect(getInvoiceValue(data1).taxAmount).toEqual(10);
  expect(getInvoiceValue(data1).taxAmount).not.toEqual(11);
  expect(getInvoiceValue(data2).taxAmount).toEqual(7.2);
  expect(getInvoiceValue(data2).taxAmount).not.toEqual(8);
  expect(getInvoiceValue(data3).taxAmount).toEqual(undefined);
});

it('should return correct grandTotal value', () => {
  expect(getInvoiceValue(data1).grandTotal).toEqual(110);
  expect(getInvoiceValue(data1).grandTotal).not.toEqual(100);
  expect(getInvoiceValue(data2).grandTotal).toEqual(144);
  expect(getInvoiceValue(data2).grandTotal).not.toEqual(151.2);
  expect(getInvoiceValue(data3).grandTotal).toEqual(300);
  expect(getInvoiceValue(data3).grandTotal).not.toEqual(310);
});
