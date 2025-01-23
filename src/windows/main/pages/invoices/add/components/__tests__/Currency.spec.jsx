// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import currencies from '../../../../libs/currencies.json';
const appConfig = require('electron').remote.require('electron-settings');

// Component
import { Currency } from '../Currency';
import { Section } from '../../shared/Section';

// Mocks
const currency = {
  code: 'USD',
  placement: 'before',
  fraction: 2,
  separator: 'commaDot'
};
const savedSettings = {
  code: 'USD',
  placement: 'before',
  fraction: 2,
  separator: 'commaDot'
};
const t = jest.fn();
const updateFieldData = jest.fn();
const updateSavedSettings = jest.fn();

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Currency
        t={t}
        currency={currency}
        savedSettings={savedSettings}
        updateFieldData={updateFieldData}
        updateSavedSettings={updateSavedSettings}
      />
    );
  });

  // TODO
  it('will not rerender if threre is no change in Props', () => {});

  it('renders necessary element', () => {
    // Section
    expect(wrapper.find(Section)).toHaveLength(1);
    expect(wrapper.find(Section)).not.toHaveLength(2);
    // label
    expect(wrapper.find('label')).toHaveLength(5);
    expect(wrapper.find('label')).not.toHaveLength(2);
    // select
    expect(wrapper.find('select')).toHaveLength(3);
    expect(wrapper.find('select')).not.toHaveLength(2);
  });

  it('handle change code correctly', () => {
    const selectEl = wrapper.find('select').first();
    selectEl.simulate('change', { target: { name: 'code', value: 'VND' } });
    expect(updateFieldData).toHaveBeenCalled();
    expect(updateFieldData).toHaveBeenCalledWith('currency', Object.assign({}, currency, {
      code: 'VND'
    }));
  });

  it('handle change sign placement correctly', () => {
    const selectEl = wrapper.find('select').first();
    selectEl.simulate('change', { target: { name: 'placement', value: 'after' } });
    expect(updateFieldData).toHaveBeenCalled();
    expect(updateFieldData).toHaveBeenCalledWith('currency', Object.assign({}, currency, {
      placement: 'after'
    }));
  });

  it('handle change fraction correctly', () => {
    const selectEl = wrapper.find('select').first();
    selectEl.simulate('change', { target: { name: 'fraction', value: 3 } });
    expect(updateFieldData).toHaveBeenCalled();
    expect(updateFieldData).toHaveBeenCalledWith('currency', Object.assign({}, currency, {
      fraction: 3
    }));
  });

  it('handle change separator correctly', () => {
    const selectEl = wrapper.find('select').first();
    selectEl.simulate('change', { target: { name: 'separator', value: 'spaceDot' } });
    expect(updateFieldData).toHaveBeenCalled();
    expect(updateFieldData).toHaveBeenCalledWith('currency', Object.assign({}, currency, {
      separator: 'spaceDot'
    }));
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Currency
          t={t}
          currency={currency}
          savedSettings={savedSettings}
          updateFieldData={updateFieldData}
          updateSavedSettings={updateSavedSettings}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
