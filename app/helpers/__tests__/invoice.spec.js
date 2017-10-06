import {
  getSubtotal,
  getGrandTotal,
} from '../invoice';

const data1 = {
  rows: [
    { subtotal: 20 },
    { subtotal: 40 },
    { subtotal: 60 },
    { subtotal: 80 },
  ],
  discount: {
    type: 'flat',
    amount: 100
  },
  vat: 10
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
    amount: 10
  },
  vat: 5
};

const data3 = {
  rows: [
    { subtotal: 10 },
    { subtotal: 30 },
    { subtotal: 50 },
    { subtotal: 70 },
  ],
}

it('should return subtotal', () => {
  expect(getSubtotal(data1)).toEqual(200);
  expect(getSubtotal(data1)).not.toEqual(100);
  expect(getSubtotal(data2)).toEqual(160);
  expect(getSubtotal(data1)).not.toEqual(120);
});

it('should return grandTotal', () => {
  expect(getGrandTotal(data1)).toEqual(110);
  expect(getGrandTotal(data1)).not.toEqual(120);
  expect(getGrandTotal(data2)).toEqual(151.2);
  expect(getGrandTotal(data2)).not.toEqual(150);
  expect(getGrandTotal(data3)).toEqual(160);
});

