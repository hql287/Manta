import { formatNumber } from '../formatNumber';

describe('should return correct format number', () => {
  let number1,
      number2,
      number3;

  beforeEach(() => {
    number1 = 99;
    number2 = 1000;
    number3 = 1999.99;
  });

  it('return correct formatted number with commaDot settings', () => {
    const formattedNumber1 = formatNumber(number1, 2, 'commaDot');
    expect(formattedNumber1).toEqual('99.00');
    const formattedNumber2 = formatNumber(number2, 2, 'commaDot');
    expect(formattedNumber2).toEqual('1,000.00');
    const formattedNumber3 = formatNumber(number3, 2, 'commaDot');
    expect(formattedNumber3).toEqual('1,999.99');
  });

  it('return correct formatted number with dotComma settings', () => {
    const formattedNumber1 = formatNumber(number1, 2, 'dotComma');
    expect(formattedNumber1).toEqual('99,00');
    const formattedNumber2 = formatNumber(number2, 2, 'dotComma');
    expect(formattedNumber2).toEqual('1.000,00');
    const formattedNumber3 = formatNumber(number3, 2, 'dotComma');
    expect(formattedNumber3).toEqual('1.999,99');
  });

  it('return correct formatted number with spaceDot settings', () => {
    const formattedNumber1 = formatNumber(number1, 2, 'spaceDot');
    expect(formattedNumber1).toEqual('99.00');
    const formattedNumber2 = formatNumber(number2, 2, 'spaceDot');
    expect(formattedNumber2).toEqual('1 000.00');
    const formattedNumber3 = formatNumber(number3, 2, 'spaceDot');
    expect(formattedNumber3).toEqual('1 999.99');
  });
})

