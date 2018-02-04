// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
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
  dueDate: {},
  currency: {},
  discount: {},
  tax: {},
  note: {},
  settings: {
    open: false,
    required_fields: {
      invoiceID: false,
      dueDate: false,
      currency: false,
      discount: false,
      tax: false,
      note: false,
    },
  },
  savedSettings: {
    tax: {},
    currency: 'USD',
    required_fields: {
      invoiceID: false,
      dueDate: false,
      currency: false,
      discount: false,
      tax: false,
      note: false,
    },
  },
};
const toggleField = jest.fn();
const toggleFormSettings = jest.fn();
const updateSavedSettings = jest.fn();
const t = jest.fn();

describe('Settings component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Settings
        t={t}
        settings={currentInvoice.settings}
        savedSettings={currentInvoice.savedSettings.required_fields}
        toggleField={toggleField}
        toggleFormSettings={toggleFormSettings}
        updateSavedSettings={updateSavedSettings}
      />
    );
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('settings')).toEqual(currentInvoice.settings);
    expect(wrapper.prop('toggleField')).toEqual(toggleField);
    expect(wrapper.prop('toggleFormSettings')).toEqual(toggleFormSettings);
    expect(wrapper.prop('updateSavedSettings')).toEqual(updateSavedSettings);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('label')).toHaveLength(13);
    expect(wrapper.find(Switch)).toHaveLength(6);
  });

  // LIFE CYCLE EVENTS
  // TODO
  it('render when necessary', () => {});

  // PRIsettingsE METHOD
  it('toggle field correctly', () => {
    // Setup
    const invoiceID = wrapper.find(Switch).at(0);
    const dueDate = wrapper.find(Switch).at(1);
    const currency = wrapper.find(Switch).at(2);
    const discount = wrapper.find(Switch).at(3);
    const tax = wrapper.find(Switch).at(4);
    const note = wrapper.find(Switch).at(5);

    // Execute & Assert
    invoiceID.find('input').simulate('change');
    expect(toggleField).toHaveBeenCalled();
    expect(toggleField).toHaveBeenCalledWith('invoiceID');
    expect(toggleField).not.toHaveBeenCalledWith('something-else');

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
          t={t}
          settings={currentInvoice.settings}
          savedSettings={currentInvoice.savedSettings.required_fields}
          toggleField={toggleField}
          toggleFormSettings={toggleFormSettings}
          updateSavedSettings={updateSavedSettings}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
