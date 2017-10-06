// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import currencies from '../../../../libs/currencies.json';
const appConfig = require('electron').remote.require('electron-settings');

// Component
import {Currency} from '../Currency';
import {Section} from '../../shared/Section';

// Mocks
const updateFieldData = jest.fn();
const currency = currencies['USD'];

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Currency currency={currency} updateFieldData={updateFieldData} />,
    );
  });

  // TODO
  it('will not rerender if threre is no change in Props', () => {

  });

  it('calls componentDidMount', () => {
    const spy = jest.spyOn(Currency.prototype, 'componentDidMount');
    const wrapper2 = mount(
      <Currency currency={currency} updateFieldData={updateFieldData} />
    );
    expect(spy).toHaveBeenCalled();
  });

  it('called update currency once mounted', () => {
    expect(updateFieldData).toHaveBeenCalled();
    expect(updateFieldData).toHaveBeenCalledWith('currency', {
      selectedCurrency: currencies[appConfig.get('appSettings.currency')],
    });
  });

  it('renders necessary element', () => {
    // Section
    expect(wrapper.find(Section)).toHaveLength(1);
    expect(wrapper.find(Section)).not.toHaveLength(2);
    // label
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('label')).not.toHaveLength(2);
    // select
    expect(wrapper.find('select')).toHaveLength(1);
    expect(wrapper.find('select')).not.toHaveLength(2);
  });

  it('handle select change correctly', () => {
    const selectEl = wrapper.find('select');
    selectEl.simulate('change', {target: {value: 'VND'}});
    expect(updateFieldData).toHaveBeenCalled();
    expect(updateFieldData).toHaveBeenCalledWith('currency', {
      selectedCurrency: currencies['VND'],
    });
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Currency currency={currency} updateFieldData={updateFieldData} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
