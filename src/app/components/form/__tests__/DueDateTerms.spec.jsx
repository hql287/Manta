// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

// Component
import { DueDateTerms } from '../DueDateTerms.jsx';
import { paymentTerms } from '../../../../libs/paymentTerms';

// Mocks
const t = jest.fn();
const updatePaymentTerm = jest.fn();
const paymentTerm = 'net10';

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <DueDateTerms t={t} paymentTerm={paymentTerm} updatePaymentTerm={updatePaymentTerm} />
    );
  });

  // TODO
  it('will not rerender if threre is no change in Props', () => {});

  it('receives correct props', () => {
    expect(wrapper.prop('paymentTerm')).toEqual(paymentTerm);
    expect(wrapper.prop('paymentTerm')).not.toEqual({});
    expect(wrapper.prop('updatePaymentTerm')).toEqual(updatePaymentTerm);
  });

  it('renders necessary element', () => {
    expect(wrapper.find('select')).toHaveLength(1);
    expect(wrapper.find('select')).not.toHaveLength(2);
    expect(wrapper.find('option')).toHaveLength(paymentTerms.length);
  });

  it('handle input change correctly', () => {
    // Setup
    const spy = jest.spyOn(DueDateTerms.prototype, 'handleInputChange');
    const wrap = mount(
      <DueDateTerms t={t} paymentTerm={paymentTerm} updatePaymentTerm={updatePaymentTerm} />
    );
    // Execute
    const select = wrap.find('select');
    select.simulate('change', { target: { value: 'net90' } });
    // Assertion
    expect(spy).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <DueDateTerms t={t} paymentTerm={paymentTerm} updatePaymentTerm={updatePaymentTerm} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
