// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

// Component
import { Discount } from '../Discount';

// Mocks
const t = jest.fn();
const updateFieldData = jest.fn();
const discount = {
  type: 'flat',
  amount: 100,
};

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Discount t={t} discount={discount} updateFieldData={updateFieldData} />
    );
  });

  // TODO
  it('will not rerender if threre is no change in Props', () => {});

  it('receives correct props', () => {
    expect(wrapper.prop('discount')).toEqual(discount);
    expect(wrapper.prop('discount')).not.toEqual({});
    expect(wrapper.prop('updateFieldData')).toEqual(updateFieldData);
  });

  it('renders necessary element', () => {
    expect(wrapper.find('label')).toHaveLength(3);
    expect(wrapper.find('input')).toHaveLength(3);
  });

  describe('handle input change correctly', () => {
    it('convert amount input to number', () => {
      // Setup
      const changeData = {
        target: {
          name: 'amount',
          value: '100',
        },
      };
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, 'handleInputChange');
      // Execute
      instance.handleInputChange(changeData);
      // Expect
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(changeData);
      expect(updateFieldData).toHaveBeenCalledWith('discount', {
        type: 'flat',
        amount: 100,
      });
    });

    it('keep type input as string', () => {
      // Setup
      const changeData = {
        target: {
          name: 'type',
          value: 'percentage',
        },
      };
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, 'handleInputChange');
      // Execute
      instance.handleInputChange(changeData);
      // Expect
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(changeData);
      expect(updateFieldData).toHaveBeenCalledWith('discount', {
        type: 'percentage',
        amount: 100,
      });
    });
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Discount t={t} discount={discount} updateFieldData={updateFieldData} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
