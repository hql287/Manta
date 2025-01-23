// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { SingleDatePicker } from 'react-dates';

// Component
import { DueDate } from '../DueDate.jsx';

// Mocks
const t = jest.fn();
const updateFieldData = jest.fn();
const dueDate = {
  required: true,
  selectedDate: {
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 12,
    date: 20,
    months: 10,
    years: 2017,
  },
};

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <DueDate t={t} dueDate={dueDate} updateFieldData={updateFieldData} />
    );
  });

  // TODO
  it('will not rerender if threre is no change in Props', () => {});

  // it('receives correct props', () => {
  //   expect(wrapper.prop('dueDate')).toEqual(dueDate);
  //   expect(wrapper.prop('dueDate')).not.toEqual({});
  //   expect(wrapper.prop('updateFieldData')).toEqual(updateFieldData);
  // });
  //
  // it('renders necessary element', () => {
  //   expect(wrapper.find('label')).toHaveLength(1);
  //   expect(wrapper.find('label')).not.toHaveLength(2);
  //   expect(wrapper.find(SingleDatePicker)).toHaveLength(1);
  //   expect(wrapper.find(SingleDatePicker)).not.toHaveLength(2);
  // });
  //
  // it('call clearDate when click clearDate Button', () => {
  //   // Setup
  //   const spy = jest.spyOn(DueDate.prototype, 'clearDate');
  //   const wrap = mount(
  //     <DueDate t={t} dueDate={dueDate} updateFieldData={updateFieldData} />
  //   );
  //   const clearDateBtn = wrap.find('.clearDateBtn');
  //   // Execute
  //   clearDateBtn.simulate('click');
  //   // Assertion
  //   expect(spy).toHaveBeenCalled();
  // });
  //
  // it('clearDate clears selectedDate', () => {
  //   // Setup
  //   const instance = wrapper.instance();
  //   const spy = jest.spyOn(instance, 'clearDate');
  //   // Execute
  //   instance.clearDate();
  //   // Assertion
  //   expect(spy).toHaveBeenCalled();
  //   expect(updateFieldData).toHaveBeenCalled();
  //   expect(updateFieldData).toHaveBeenCalledWith('dueDate', {
  //     selectedDate: null,
  //   });
  // });
  //
  // it('matches snapshot', () => {
  //   const tree = renderer
  //     .create(
  //       <DueDate t={t} dueDate={dueDate} updateFieldData={updateFieldData} />
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
