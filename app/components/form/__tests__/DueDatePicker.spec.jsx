// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { SingleDatePicker } from 'react-dates';

// Component
import { DueDatePicker } from '../DueDatePicker.jsx';

// Mocks
const t = jest.fn();
const updateCustomDate = jest.fn();
const selectedDate = {
  milliseconds: 0,
  seconds: 0,
  minutes: 0,
  hours: 12,
  date: 20,
  months: 10,
  years: 2017,
};

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <DueDatePicker t={t} selectedDate={selectedDate} updateCustomDate={updateCustomDate} />
    );
  });

  // TODO
  it('will not rerender if threre is no change in Props', () => {});

  it('receives correct props', () => {
    expect(wrapper.prop('selectedDate')).toEqual(selectedDate);
    expect(wrapper.prop('selectedDate')).not.toEqual({});
    expect(wrapper.prop('updateCustomDate')).toEqual(updateCustomDate);
  });

  it('renders necessary element', () => {
    expect(wrapper.find(SingleDatePicker)).toHaveLength(1);
    expect(wrapper.find(SingleDatePicker)).not.toHaveLength(2);
  });

  it('call clearDate when click clearDate Button', () => {
    // Setup
    const spy = jest.spyOn(DueDatePicker.prototype, 'clearDate');
    const wrap = mount(
      <DueDatePicker t={t} selectedDate={selectedDate} updateCustomDate={updateCustomDate} />
    );
    const clearDateBtn = wrap.find('.clearDateBtn');
    // Execute
    clearDateBtn.simulate('click');
    // Assertion
    expect(spy).toHaveBeenCalled();
  });

  it('clearDate clears selectedDate', () => {
    // Setup
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'clearDate');
    // Execute
    instance.clearDate();
    // Assertion
    expect(spy).toHaveBeenCalled();
    expect(updateCustomDate).toHaveBeenCalled();
    expect(updateCustomDate).toHaveBeenCalledWith(null);
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <DueDatePicker t={t} selectedDate={selectedDate} updateCustomDate={updateCustomDate} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
