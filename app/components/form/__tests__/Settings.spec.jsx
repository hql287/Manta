// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import Switch from '../../shared/Switch';

// Component
import Settings from '../Settings.jsx';

// Mocks
const currentInvoice = {
  recipient: {
    newRecipient: true,
    new: {},
    select: {},
  },
  rows: [],
  dueDate: { required: false },
  currency: { required: false },
  discount: { required: false },
  tax: { required: false },
  note: { required: false },
  settingsOpen: false,
};
const toggleField = jest.fn();
const toggleFormSettings = jest.fn();

describe('Settings component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Settings
        toggleField={toggleField}
        toggleFormSettings={toggleFormSettings}
        currentInvoice={currentInvoice}
      />,
    );
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('toggleField')).toEqual(toggleField);
    expect(wrapper.prop('toggleFormSettings')).toEqual(toggleFormSettings);
    expect(wrapper.prop('currentInvoice')).toEqual(currentInvoice);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('label')).toHaveLength(11);
    expect(wrapper.find(Switch)).toHaveLength(5);
  });

  // LIFE CYCLE EVENTS
  // TODO
  it('render when necessary', () => {});

  // PRIsettingsE METHOD
  it('toggle field correctly', () => {
    // Setup
    const dueDate  = wrapper.find(Switch).at(0);
    const currency = wrapper.find(Switch).at(1);
    const discount = wrapper.find(Switch).at(2);
    const tax      = wrapper.find(Switch).at(3);
    const note     = wrapper.find(Switch).at(4);

    // Execute & Assert
    dueDate.find('input').simulate('change');
    expect(toggleField).toHaveBeenCalled();
    expect(toggleField).toHaveBeenCalledWith('dueDate');
    expect(toggleField).not.toHaveBeenCalledWith('something-else');

    currency.find('input').simulate('change');
    expect(toggleField).toHaveBeenCalled();
    expect(toggleField).toHaveBeenCalledWith('currency');
    expect(toggleField).not.toHaveBeenCalledWith('something-else');

    discount.find('input').simulate('change');
    expect(toggleField).toHaveBeenCalled();
    expect(toggleField).toHaveBeenCalledWith('discount');
    expect(toggleField).not.toHaveBeenCalledWith('something-else');

    tax.find('input').simulate('change');
    expect(toggleField).toHaveBeenCalled();
    expect(toggleField).toHaveBeenCalledWith('tax');
    expect(toggleField).not.toHaveBeenCalledWith('something-else');

    note.find('input').simulate('change');
    expect(toggleField).toHaveBeenCalled();
    expect(toggleField).toHaveBeenCalledWith('note');
    expect(toggleField).not.toHaveBeenCalledWith('something-else');
  });

  // SNAPSHOT
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Settings
          toggleField={toggleField}
          toggleFormSettings={toggleFormSettings}
          currentInvoice={currentInvoice}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
