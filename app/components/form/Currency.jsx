// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const appConfig = require('electron').remote.require('electron-settings');
import currencies from '../../../libs/currencies.json';
import { keys, sortBy, isEqual } from 'lodash';

// Custom Components
import { Section, Header } from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
export class Currency extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isSettingsSaved = this.isSettingsSaved.bind(this);
    this.saveAsDefault = this.saveAsDefault.bind(this);
    this.sortCurrencies = this.sortCurrencies.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.currency !== nextProps.currency) return true;
    if (this.props.savedSettings !== nextProps.savedSettings) return true;
    return true;
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.props.updateFieldData('currency', currencies[value]);
  }

  isSettingsSaved() {
    return isEqual(this.props.currency.code, this.props.savedSettings);
  }

  saveAsDefault() {
    const { updateSavedSettings } = this.props;
    updateSavedSettings('currency', this.props.currency.code);
  }

  sortCurrencies() {
    // Sort currencies
    const currenciesKeys = keys(currencies);
    const currenciesKeysAndValues = currenciesKeys.map(key => [
      key,
      currencies[key].name,
      currencies[key].code,
    ]);
    const currenciesSorted = sortBy(currenciesKeysAndValues, [
      array => array[1],
    ]);
    return currenciesSorted.map(obj => {
      const [key, name, code] = obj;
      const optionKey = code;
      const optionValue = code;
      const optionLabel = name;
      return (
        <option value={optionValue} key={optionKey}>
          {optionLabel}
        </option>
      );
    });
  }

  render() {
    const { t } = this.props;
    return (
      <Section>
        <Header>
          <label className="itemLabel">
            {t('form:fields:currency')}
          </label>
          {!this.isSettingsSaved() && (
            <a href="#" onClick={this.saveAsDefault}>
              <i className="ion-checkmark" /> {t('common:saveAsDefault')}
            </a>
          )}
        </Header>
        <select
          value={this.props.currency.code}
          onChange={this.handleInputChange}
        >
          {this.sortCurrencies()}
        </select>
      </Section>
    );
  }
}

Currency.propTypes = {
  currency: PropTypes.object.isRequired,
  savedSettings: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  updateFieldData: PropTypes.func.isRequired,
  updateSavedSettings: PropTypes.func.isRequired,
};

// Export
export default _withFadeInAnimation(Currency);
