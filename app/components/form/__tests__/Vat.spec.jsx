// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

// Component
import {Vat} from '../Vat.jsx';

// Mocks
const updateFieldData = jest.fn();
const vat = {
  required: true,
  amount: 10
};

describe('Note component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Vat vat={vat} updateFieldData={updateFieldData} />);
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('vat')).toEqual(vat);
    expect(wrapper.prop('updateFieldData')).toEqual(updateFieldData);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  // LIFE CYCLE EVENTS
  // TODO
  it('render when necessary', () => {});

  // PRIVATE METHOD
  it('handleInputChange correctly', () => {
    const spy = jest.spyOn(Vat.prototype, 'handleInputChange');
    const wrap = mount(<Vat vat={vat} updateFieldData={updateFieldData} />);
    const input = wrap.find('input');
    input.simulate('change', { target: { value: '20' } });
    expect(spy).toHaveBeenCalled();
  });

  // SNAPSHOT
  it('matches snapshot', () => {
    const tree = renderer
      .create(<Vat vat={vat} updateFieldData={updateFieldData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
