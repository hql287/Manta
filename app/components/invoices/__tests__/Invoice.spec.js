// Libs
import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';

// Component
import Invoice from '../Invoice';
import Button from '../../shared/Button';
import SplitButton from '../../shared/SplitButton';

// Mocks
const invoice = {
  _id: '37b2804e-bfc1-4289-b1d7-226c5652ac91',
  status: 'pending',
  currency: {
    code: 'USD',
    decimal_digits: 2,
    name: 'US Dollar',
    name_plural: 'US dollars',
    rounding: 0,
    symbol: '$',
    symbol_native: '$',
  },
  subtotal: 3843,
  grandTotal: 3843,
  recipient: {
    _id: '3bd85cb9-7675-4d59-b9c3-305481cb77c9',
    company: 'Lindgren Group',
    email: 'Hattie42@gmail.com',
    fullname: 'Penelope Hettinger',
    phone: '854-306-7837',
  },
};

const deleteInvoice = jest.fn();
const setInvoiceStatus = jest.fn();
const dateFormat = 'MM/DD/YY';

// Tests
describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Invoice
        invoice={invoice}
        deleteInvoice={deleteInvoice}
        setInvoiceStatus={setInvoiceStatus}
        dateFormat={dateFormat}
      />,
    );
  });

  it('receives correct props', () => {
    const mountWrapper = mount(
      <Invoice
        invoice={invoice}
        deleteInvoice={deleteInvoice}
        setInvoiceStatus={setInvoiceStatus}
        dateFormat={dateFormat}
      />,
    );
    expect(mountWrapper.prop('invoice')).toEqual(invoice);
    expect(mountWrapper.prop('deleteInvoice')).toEqual(deleteInvoice);
    expect(mountWrapper.prop('setInvoiceStatus')).toEqual(setInvoiceStatus);
  });

  it('render with a class of .col-lg-6', () => {
    expect(wrapper.find('.col-lg-6')).toHaveLength(1);
    expect(wrapper.find('.col-lg-6')).not.toHaveLength(2);
  });

  it('render invoice status in the header', () => {
    expect(
      wrapper.find('Invoice__Header').find('Invoice__Status'),
    ).toHaveLength(1);
  });

  it('render invoice status correctly', () => {
    // Pending Invoice (default)
    expect(
      wrapper
        .find('Invoice__Header')
        .find('Invoice__Status')
        .find('span')
        .text(),
    ).toEqual('Pending');

    // Paid Invoice
    const paidInvoice = Object.assign({}, invoice, {status: 'paid'});
    const paidInvoiceWapper = shallow(
      <Invoice
        invoice={paidInvoice}
        deleteInvoice={deleteInvoice}
        setInvoiceStatus={setInvoiceStatus}
        dateFormat={dateFormat}
      />,
    );
    expect(
      paidInvoiceWapper
        .find('Invoice__Header')
        .find('Invoice__Status')
        .find('span')
        .text(),
    ).toEqual('Paid');

    // Cancelled Invoice
    const cancelledInvoice = Object.assign({}, invoice, {status: 'cancelled'});
    const cancelledInvoiceWapper = shallow(
      <Invoice
        invoice={cancelledInvoice}
        deleteInvoice={deleteInvoice}
        setInvoiceStatus={setInvoiceStatus}
        dateFormat={dateFormat}
      />,
    );
    expect(
      cancelledInvoiceWapper
        .find('Invoice__Header')
        .find('Invoice__Status')
        .find('span')
        .text(),
    ).toEqual('Cancelled');

    // Refunded Invoice
    const refundedInvoice = Object.assign({}, invoice, {status: 'refunded'});
    const refundedInvoiceWapper = shallow(
      <Invoice
        invoice={refundedInvoice}
        deleteInvoice={deleteInvoice}
        setInvoiceStatus={setInvoiceStatus}
        dateFormat={dateFormat}
      />,
    );
    expect(
      refundedInvoiceWapper
        .find('Invoice__Header')
        .find('Invoice__Status')
        .find('span')
        .text(),
    ).toEqual('Refunded');
  });

  it('render delete button in the header', () => {
    expect(wrapper.find('Invoice__Header').find(Button)).toHaveLength(1);
  });

  it('render a split button and 2 buttons in the footer', () => {
    expect(wrapper.find('Invoice__Footer').find(SplitButton)).toHaveLength(1);
    expect(wrapper.find('Invoice__Footer').find(Button)).toHaveLength(2);
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Invoice
          invoice={invoice}
          deleteInvoice={deleteInvoice}
          setInvoiceStatus={setInvoiceStatus}
          dateFormat={dateFormat}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('handle clicks correctly', () => {
  let wrapper, editBtn, viewBtn, deleteBtn, spyViewAction, spyEditAction;
  beforeEach(() => {
    spyViewAction = jest.spyOn(Invoice.prototype, 'viewInvoice');
    spyEditAction = jest.spyOn(Invoice.prototype, 'editInvoice');
    wrapper = shallow(
      <Invoice
        invoice={invoice}
        deleteInvoice={deleteInvoice}
        setInvoiceStatus={setInvoiceStatus}
        dateFormat={dateFormat}
      />,
    );
    viewBtn = wrapper
      .find('Invoice__Footer')
      .find(Button)
      .last();
    editBtn = wrapper
      .find('Invoice__Footer')
      .find(Button)
      .first();
    deleteBtn = wrapper.find(Button).first();
  });

  it('handle delete action correctly', () => {
    deleteBtn.simulate('click');
    expect(deleteInvoice).toHaveBeenCalled();
    expect(deleteInvoice).toHaveBeenCalledWith(invoice._id);
  });

  it('handle view action correctly', () => {
    viewBtn.simulate('click');
    expect(spyViewAction).toHaveBeenCalled();
  });

  it('handle edit action correctly', () => {
    editBtn.simulate('click');
    expect(spyEditAction).toHaveBeenCalled();
  });
});
