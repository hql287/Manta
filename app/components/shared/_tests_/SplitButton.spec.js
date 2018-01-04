// Libs
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

// Component
import SplitButton from '../SplitButton';

// Mocks
const mainAction = jest.fn();
const mainButton = {
  label: 'Main Action',
  action: mainAction,
};

const optionAction1 = jest.fn();
const optionAction2 = jest.fn();
const optionAction3 = jest.fn();
const options = [
  {
    label: 'Option A',
    action: optionAction1,
  },
  {
    label: 'Option B',
    action: optionAction2,
  },
  {
    label: 'Option C',
    action: optionAction3,
  },
];

describe('Renders correctly to the DOM', () => {
  let wrapper, toggleBtn, mainBtn;
  beforeEach(() => {
    wrapper = shallow(
      <SplitButton mainButton={mainButton} options={options} />
    );
    mainBtn = wrapper.find('a').first();
    toggleBtn = wrapper.find('a').last();
  });

  it('renders links as a element', () => {
    expect(wrapper.find('a')).toHaveLength(2);
    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('hide options by default', () => {
    expect(wrapper.state().showOptions).toEqual(false);
    expect(wrapper.find('SplitButton__Addon')).toHaveLength(0);
  });

  it('renders options list correctly', () => {
    toggleBtn.simulate('click');
    expect(wrapper.state().showOptions).toEqual(true);
    expect(wrapper.find('SplitButton__Addon')).toHaveLength(1);
    expect(wrapper.find('SplitButton__Addon').children()).toHaveLength(
      options.length
    );
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(<SplitButton mainButton={mainButton} options={options} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Handles click correctly', () => {
  let wrapper, toggleBtn, mainBtn, spyHandleClick, spyHandleOutsideClick;
  beforeEach(() => {
    spyHandleClick = jest.spyOn(SplitButton.prototype, 'handleClick');
    spyHandleOutsideClick = jest.spyOn(
      SplitButton.prototype,
      'handleOutsideClick'
    );
    wrapper = shallow(
      <SplitButton mainButton={mainButton} options={options} />
    );
    mainBtn = wrapper.find('a').first();
    toggleBtn = wrapper.find('a').last();
  });

  it('handle main button click correcrtly', () => {
    mainBtn.simulate('click');
    expect(mainAction).toHaveBeenCalled();
  });

  it('handle options click correcrtly', () => {
    // Show the dropdown
    toggleBtn.simulate('click');
    const firstBtn = wrapper
      .find('SplitButton__Addon')
      .find('a')
      .first();
    const lastBtn = wrapper
      .find('SplitButton__Addon')
      .find('a')
      .last();
    // Click the first btn
    firstBtn.simulate('click');
    expect(optionAction1).toHaveBeenCalled();
    // Click the second btn
    lastBtn.simulate('click');
    expect(optionAction3).toHaveBeenCalled();
  });

  it('handle click outside correctly', () => {
    // Show the dropdown
    toggleBtn.simulate('click');
    // Click the main button - outside the option
    mainBtn.simulate('click');
    // The dropdown will be removed
    expect(wrapper.state().showOptions).toEqual(false);
    expect(wrapper.find('SplitButton__Addon')).toHaveLength(0);
  });
});
