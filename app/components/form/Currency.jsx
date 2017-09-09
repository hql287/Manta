// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
import _ from 'lodash';
import currencies from '../../../libs/currencies.json';

// Custom Components
import {Section} from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class Currency extends Component {
  constructor(props) {
    super(props);
    this.updateCurrency = this.updateCurrency.bind(this);
  }

  componentDidMount() {
    this.props.updateFieldData('currency', 'USD');
  }

  shouldComponentUpdate(nextProps) {
    return this.props.currency !== nextProps.currency;
  }

  updateCurrency(event) {
    const value = event.target.value;
    const selectedCurrency = value === '' ? null : value;
    this.props.updateFieldData('currency', selectedCurrency);
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
    return (
      <Section>
        <label className="itemLabel">Currency</label>
        <select
          value={currency.selectedCurrency}
          onChange={this.updateCurrency}>
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
