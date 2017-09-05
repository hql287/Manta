// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
import _ from 'lodash';
import currencies from '../../../libs/currencies.json';

// Custom Components
import Switch from '../shared/Switch';
import {Section} from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class Currency extends Component {
  updateCurrency = event => {
    const {updateFieldData} = this.props;
    const value = event.target.value;
    const selectedCurrency = value === '' ? null : value;
    updateFieldData('currency', selectedCurrency);
  };

  render = () => {
    const currenciesKeys = _.keys(currencies);
    const currenciesOptions = currenciesKeys.map(key => {
      let optionKey = currencies[key]['code'];
      let optionValue = currencies[key]['code'];
      let optionLabel = currencies[key]['name'];
      return (
        <option value={optionValue} key={optionKey}>
          {optionLabel}
        </option>
      );
    });

    const {currency, toggleField} = this.props;

    return (
      <Section>
        <label className="itemLabel">Currency</label>
        <select
          value={currency.selectedCurrency}
          onChange={e => this.updateCurrency(e)}>
          <option value="">Select A Currency</option>
          {currenciesOptions}
        </select>
      </Section>
    );
  };
}

// Export
export default _withFadeInAnimation(Currency);
