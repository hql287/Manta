// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
const appConfig = require('electron').remote.require('electron-settings');
import currencies from '../../../libs/currencies.json';
import { keys, sortBy, isEqual } from 'lodash';

// Custom Components
import { Section, Header } from '../shared/Section';
import { Row, Field, Part } from '../shared/Part';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
export class Currency extends PureComponent {
  constructor(props) {
    super(props);
    this.state = props.currency;
    this.isSettingsSaved = this.isSettingsSaved.bind(this);
    this.saveAsDefault = this.saveAsDefault.bind(this);
    this.sortCurrencies = this.sortCurrencies.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Handle Form Clear
  componentWillReceiveProps(nextProps) {
    // Already made changes but not saved
    if (this.state !== this.props.savedSettings) {
      // Reset to savedSettings if the below confition is met
      if (nextProps.currency === nextProps.savedSettings) {
        this.setState(nextProps.savedSettings, () => {
          this.updateCurrencyState();
        });
      }
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = name === 'fraction' ? parseInt(target.value, 10) : target.value;
    this.setState({
        [name]: value
      }, () => {
        this.updateCurrencyState();
      }
    );
  }

  updateCurrencyState() {
    const { updateFieldData } = this.props;
    updateFieldData('currency', this.state);
  }

  isSettingsSaved() {
    return isEqual(this.props.currency, this.props.savedSettings);
  }

  saveAsDefault() {
    const { updateSavedSettings } = this.props;
    updateSavedSettings('currency', this.state);
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
        <Part>
          <Row>
            <Field>
              <label className="itemLabel">
                {t('form:fields:currency')}
              </label>
              <select
                name="code"
                value={this.state.code}
                onChange={this.handleInputChange}
              >
                {this.sortCurrencies()}
              </select>
            </Field>
            <Field>
              <label className="itemLabel">{t('settings:fields:currency:separator')}</label>
              <select
                name="separator"
                value={this.state.separator}
                onChange={this.handleInputChange}
              >
                <option value="commaDot">
                  1,999.000 ({t('settings:fields:currency:commaDot')})
                </option>
                <option value="dotComma">
                  1.999,000 ({t('settings:fields:currency:dotComma')})
                </option>
                <option value="spaceDot">
                  1 999.000 ({t('settings:fields:currency:spaceDot')})
                </option>
              </select>
            </Field>
          </Row>
          <Row>
            <Field>
              <label className="itemLabel">{t('settings:fields:currency:placement')}</label>
              <select
                name="placement"
                value={this.state.placement}
                onChange={this.handleInputChange}
              >
                <option value="before">{t('settings:fields:currency:beforeAmount')}</option>
                <option value="after">{t('settings:fields:currency:afterAmount')}</option>
              </select>
            </Field>
            <Field>
              <label className="itemLabel">{t('settings:fields:currency:fraction')}</label>
              <input
                className="form-control"
                name="fraction"
                type="number"
                value={this.state.fraction}
                onChange={this.handleInputChange}
              />
            </Field>
          </Row>
        </Part>
      </Section>
    );
  }
}

Currency.propTypes = {
  currency: PropTypes.object.isRequired,
  savedSettings: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateFieldData: PropTypes.func.isRequired,
  updateSavedSettings: PropTypes.func.isRequired,
};

// Export
export default _withFadeInAnimation(Currency);
