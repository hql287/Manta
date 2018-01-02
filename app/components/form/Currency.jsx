// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
const appConfig = require('electron').remote.require('electron-settings');
import currencies from '../../../libs/currencies.json';
import {keys, sortBy, isEqual} from 'lodash';

// Custom Components
import {Section, Header} from '../shared/Section';

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
    if (this.props.savedSetting !== nextProps.savedSetting) return true;
    return true;
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.props.updateFieldData('currency', currencies[value]);
  }

  isSettingsSaved() {
    return isEqual(this.props.currency.code, this.props.savedSetting);
  }

  saveAsDefault() {
    const {updateSavedSettings} = this.props;
    updateSavedSettings('currency', this.props.currency);
  }

  sortCurrencies() {
    // Sort currencies
    const currenciesKeys = keys(currencies);
    const currenciesKeysAndValues = currenciesKeys.map(key => [
      key,
      currencies[key]['name'],
      currencies[key]['code'],
    ]);
    const currenciesSorted = sortBy(currenciesKeysAndValues, [
      array => array[1],
    ]);
    return currenciesSorted.map(obj => {
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
  }

  render() {
    return (
      <Section>
        <Header>
          <label className="itemLabel">Currency</label>
          {!this.isSettingsSaved() && (
            <a href="#" onClick={this.saveAsDefault}>
              <i className="ion-checkmark" /> Save as default?
            </a>
          )}
        </Header>
        <select
          value={this.props.currency.code}
          onChange={this.handleInputChange}>
          {this.sortCurrencies()}
        </select>
      </Section>
    );
  }
}

Currency.propTypes = {
  currency: PropTypes.object.isRequired,
  savedSetting: PropTypes.string.isRequired,
  updateFieldData: PropTypes.func.isRequired,
  updateSavedSettings: PropTypes.func.isRequired,
};

// Export
export default _withFadeInAnimation(Currency);
