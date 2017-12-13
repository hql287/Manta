// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
const appConfig = require('electron').remote.require('electron-settings');
import currencies from '../../../libs/currencies.json';
import { keys, sortBy } from 'lodash';

// Custom Components
import {Section} from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
export class Currency extends Component {
  constructor(props) {
    super(props);
    this.updateCurrency = this.updateCurrency.bind(this);
  }

  componentDidMount() {
    const currencyCode = appConfig.get('appSettings.currency');
    this.props.updateFieldData('currency', {
      selectedCurrency: currencies[currencyCode],
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.currency !== nextProps.currency;
  }

  updateCurrency(event) {
    const value = event.target.value;
    const currencyCode = value === '' ? null : value;
    this.props.updateFieldData('currency', {
      selectedCurrency: currencies[currencyCode]
    });
  }

  render() {
    const currenciesKeys = keys(currencies);
    const currenciesKeysAndValues = currenciesKeys.
      map(key => [key, currencies[key]['name'], currencies[key]['code']]);
    const currenciesSorted = sortBy(currenciesKeysAndValues, [array => array[1]]);
    const currenciesOptions = currenciesSorted.map((obj) => {
      const [key, name, code] = obj;

      let optionKey = code;
      let optionValue = code;
      let optionLabel = name;

      return (
        <option value={optionValue} key={optionKey}>
          {optionLabel}
        </option>
      );
    });
    const {currency} = this.props;
    const currencyCode = currency.selectedCurrency
      ? currency.selectedCurrency.code
      : appConfig.get('appSettings.currency');
    return (
      <Section>
        <label className="itemLabel">Currency</label>
        <select value={currencyCode} onChange={this.updateCurrency}>
          {currenciesOptions}
        </select>
      </Section>
    );
  }
}

Currency.propTypes = {
  currency: PropTypes.object.isRequired,
  updateFieldData: PropTypes.func.isRequired,
};

// Export
export default _withFadeInAnimation(Currency);
