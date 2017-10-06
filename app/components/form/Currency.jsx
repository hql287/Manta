// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
const appConfig = require('electron').remote.require('electron-settings');
import currencies from '../../../libs/currencies.json';
import _ from 'lodash';

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
