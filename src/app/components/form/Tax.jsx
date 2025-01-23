// Libraries
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
// Custom Components
import { Section, Header } from '../shared/Section';
// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';
// Styles
import styled from 'styled-components';
import { Part, Row, Field } from '../shared/Part';
const TaxID = styled.div``;
const TaxAmount = styled.div`flex: 1;`;

// Component
export class Tax extends PureComponent {
  constructor(props) {
    super(props);
    this.state = props.tax;
    this.isSettingsSaved = this.isSettingsSaved.bind(this);
    this.saveAsDefault = this.saveAsDefault.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Handle Form Clear
  componentWillReceiveProps(nextProps) {
    // Already made changes but not saved
    if (this.state !== this.props.savedSettings) {
      // Reset to savedSettings if the below confition is met
      if (nextProps.tax === nextProps.savedSettings) {
        this.setState(nextProps.savedSettings, () => {
          this.updateTaxState();
        });
      }
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = name === 'amount' ? parseFloat(target.value) : target.value;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.updateTaxState();
      }
    );
  }

  updateTaxState() {
    const { updateFieldData } = this.props;
    updateFieldData('tax', this.state);
  }

  isSettingsSaved() {
    return isEqual(this.state, this.props.savedSettings);
  }

  saveAsDefault() {
    const { updateSavedSettings } = this.props;
    updateSavedSettings('tax', this.state);
  }

  render() {
    const { t } = this.props;
    return (
      <Section>
        <Header>
          <label className="itemLabel">{t('form:fields:tax:name')}</label>
          {!this.isSettingsSaved() && (
            <a href="#" onClick={this.saveAsDefault}>
              <i className="ion-checkmark" /> {t('common:saveAsDefault')}
            </a>
          )}
        </Header>
        <Part>
          <Row>
            <Field>
              <label className="itemLabel">{t('form:fields:tax:id')}</label>
              <TaxID>
                <input
                  name="tin"
                  type="text"
                  value={this.state.tin}
                  onChange={this.handleInputChange}
                  placeholder={t('form:fields:tax:id')}
                />
              </TaxID>
            </Field>
          </Row>
          <Row>
            <Field>
              <label className="itemLabel">{t('common:amount')} (%)</label>
              <TaxAmount>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  value={this.state.amount}
                  onChange={this.handleInputChange}
                  placeholder={t('common:amount')}
                />
              </TaxAmount>
            </Field>
            <Field>
              <label className="itemLabel">{t('form:fields:tax:method')}</label>
              <select
                name="method"
                value={this.state.method}
                onChange={this.handleInputChange}
              >
                <option value="default">{t('common:default')}</option>
                <option value="reverse">{t('form:fields:tax:reverse')}</option>
              </select>
            </Field>
          </Row>
        </Part>
      </Section>
    );
  }
}

Tax.propTypes = {
  updateSavedSettings: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  tax: PropTypes.object.isRequired,
  savedSettings: PropTypes.object.isRequired,
  updateFieldData: PropTypes.func.isRequired,
};

// Exports
export default _withFadeInAnimation(Tax);
