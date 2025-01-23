// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

// Component
import { Tax } from '../Tax.jsx';

// Mocks
const tax = {
  amount: 10,
  tin: '123-456-789',
  mode: 'default',
};
const savedSettings = {
  amount: 10,
  tin: '123-456-789',
  mode: 'default',
};
const t = jest.fn();
const updateFieldData = jest.fn();
const updateSavedSettings = jest.fn();

describe('Note component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Tax
        t={t}
        tax={tax}
        savedSettings={savedSettings}
        updateSavedSettings={updateSavedSettings}
        updateFieldData={updateFieldData}
      />
    );
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('tax')).toEqual(tax);
    expect(wrapper.prop('updateFieldData')).toEqual(updateFieldData);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('label')).toHaveLength(4);
    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('select')).toHaveLength(1);
  });

  // LIFE CYCLE EVENTS
  // TODO
  it('render when necessary', () => {});

  // PRIVATE METHOD
  it('handleInputChange correctly', () => {
    const spy = jest.spyOn(Tax.prototype, 'handleInputChange');
    const wrap = mount(
      <Tax
        t={t}
        tax={tax}
        savedSettings={savedSettings}
        updateSavedSettings={updateSavedSettings}
        updateFieldData={updateFieldData}
      />
    );
    // Changing Amount
    const amount = wrap.find('input').last();
    amount.simulate('change', { target: { value: '20' } });
    expect(spy).toHaveBeenCalled();
    // Changing TIN
    const tin = wrap.find('input').first();
    tin.simulate('change', { target: { value: '987-654-321' } });
    expect(spy).toHaveBeenCalled();
    // Changing Mode
    const mode = wrap.find('select');
    mode.simulate('change', { target: { value: 'reverse' } });
    expect(spy).toHaveBeenCalled();
  });

  // SNAPSHOT
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Tax
          t={t}
          tax={tax}
          savedSettings={savedSettings}
          updateSavedSettings={updateSavedSettings}
          updateFieldData={updateFieldData}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
