// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ipc = require('electron').ipcRenderer;

// Custom Libs
const openDialog = require('../../renderers/dialog.js');
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

import Currency from './_partials/invoice/Currency';
import Fields from './_partials/invoice/Fields';
import Other from './_partials/invoice/Other';
import Tax from './_partials/invoice/Tax';

// Component
class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.invoice;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTaxChange = this.handleTaxChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  componentDidMount() {
    const { t } = this.props;
    ipc.on('no-access-directory', (event, message) => {
      openDialog({
        type: 'warning',
        title: t('dialog:noAccess:title'),
        message: `${message}. ${t('dialog:noAccess:message')}`,
      });
    });

    ipc.on('confirmed-export-directory', (event, path) => {
      this.setState({ exportDir: path }, () => {
        this.props.updateSettings('invoice', this.state);
      });
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners('no-access-directory');
    ipc.removeAllListeners('confirmed-export-directory');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value }, () => {
      this.props.updateSettings('invoice', this.state);
    });
  }

  handleTaxChange(event) {
    const target = event.target;
    const name = target.name;
    const value = name === 'amount' ? parseFloat(target.value) : target.value;
    this.setState(
      {
        tax: Object.assign({}, this.state.tax, {
          [name]: value,
        }),
      },
      () => {
        this.props.updateSettings('invoice', this.state);
      }
    );
  }

  handleCurrencyChange(event) {
    const target = event.target;
    const name = target.name;
    const value = name === 'fraction' ? parseInt(target.value, 10) : target.value;
    this.setState(
      {
        currency: Object.assign({}, this.state.currency, {
          [name]: value,
        }),
      },
      () => {
        this.props.updateSettings('invoice', this.state);
      }
    );
  }

  handleVisibilityChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.checked;
    this.setState(
      {
        required_fields: Object.assign({}, this.state.required_fields, {
          [name]: value,
        }),
      },
      () => {
        this.props.updateSettings('invoice', this.state);
      }
    );
  }

  selectExportDir() {
    ipc.send('select-export-directory');
  }

  render() {
    const { t } = this.props;
    const {
      exportDir,
      template,
      currency,
      tax,
      required_fields,
      dateFormat,
    } = this.state;

    return (
      <div>
        <label className="itemLabel">{t('settings:fields:taxSettings')}</label>
        <Section>
          <Row>
            <Field>
              <label className="itemLabel">{t('form:fields:tax:id')}</label>
              <input
                name="tin"
                type="text"
                value={tax.tin}
                onChange={this.handleTaxChange}
                placeholder={t('form:fields:tax:id')}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <label className="itemLabel">{t('common:amount')}</label>
              <input
                name="amount"
                type="number"
                step="0.01"
                value={tax.amount}
                onChange={this.handleTaxChange}
                placeholder={t('common:amount')}
              />
            </Field>
            <Field>
              <label className="itemLabel">{t('form:fields:tax:method')}</label>
              <select
                name="method"
                value={tax.method}
                onChange={this.handleTaxChange}
              >
                <option value="default">{t('common:default')}</option>
                <option value="reverse">{t('form:fields:tax:reverse')}</option>
              </select>
            </Field>
          </Row>
        </Section>

        <label className="itemLabel">{t('settings:fields:requiredFields')}</label>
        <Section>
          <Row>
            <Field>
              <label className="itemLabel">{t('invoices:fields:invoiceID')}</label>
              <label className="switch">
                <input
                  name="invoiceID"
                  type="checkbox"
                  checked={required_fields.invoiceID}
                  onChange={this.handleVisibilityChange}
                />
                <span className="slider round" />
              </label>
            </Field>
            <Field>
              <label className="itemLabel">{t('form:fields:dueDate:name')}</label>
              <label className="switch">
                <input
                  name="dueDate"
                  type="checkbox"
                  checked={required_fields.dueDate}
                  onChange={this.handleVisibilityChange}
                  placeholder={t('form:fields:dueDate:name')}
                />
                <span className="slider round" />
              </label>
            </Field>
            <Field>
              <label className="itemLabel">{t('form:fields:currency')}</label>
              <label className="switch">
                <input
                  name="currency"
                  type="checkbox"
                  checked={required_fields.currency}
                  onChange={this.handleVisibilityChange}
                />
                <span className="slider round" />
              </label>
            </Field>
            <Field>
              <label className="itemLabel">{t('form:fields:discount:name')}</label>
              <label className="switch">
                <input
                  name="discount"
                  type="checkbox"
                  checked={required_fields.discount}
                  onChange={this.handleVisibilityChange}
                />
                <span className="slider round" />
              </label>
            </Field>
            <Field>
              <label className="itemLabel">{t('form:fields:tax:name')}</label>
              <label className="switch">
                <input
                  name="tax"
                  type="checkbox"
                  checked={required_fields.tax}
                  onChange={this.handleVisibilityChange}
                />
                <span className="slider round" />
              </label>
            </Field>
            <Field>
              <label className="itemLabel">{t('form:fields:note')}</label>
              <label className="switch">
                <input
                  name="note"
                  type="checkbox"
                  checked={required_fields.note}
                  onChange={this.handleVisibilityChange}
                />
                <span className="slider round" />
              </label>
            </Field>
          </Row>
        </Section>

        <label className="itemLabel">{t('settings:fields:other')}</label>
        <Section>
          <Row>
            <Field>
              <label className="itemLabel">{t('form:fields:currency')}</label>
              <select
                name="currency"
                value={currency}
                onChange={this.handleInputChange}
              >
                {this.sortCurrencies()}
              </select>
            </Field>
            <Field>
              <label className="itemLabel">{t('settings:fields:template')}</label>
              <select
                name="template"
                value={template}
                onChange={this.handleInputChange}
              >
                <option value="minimal">Minimal</option>
                <option value="business">Business</option>
              </select>
            </Field>
          </Row>
          <Row>
            <Field>
              <label className="itemLabel">{t('settings:fields:dateFormat')}</label>
              <select
                name="dateFormat"
                value={dateFormat}
                onChange={this.handleInputChange}
              >
                <option value="dddd, MMMM Do, YYYY">
                  {moment(Date.now()).format('dddd, MMMM Do, YYYY')} (dddd, MMMM
                  Do, YYYY)
                </option>
                <option value="MMMM Do, YYYY">
                  {moment(Date.now()).format('MMMM Do, YYYY')} (MMMM Do, YYYY)
                </option>
                <option value="MM/DD/YYYY">
                  {moment(Date.now()).format('MM/DD/YYYY')} (MM/DD/YYYY)
                </option>
                <option value="MM/DD/YY">
                  {moment(Date.now()).format('MM/DD/YY')} (MM/DD/YY)
                </option>
                <option value="dddd, DD MMMM YYYY">
                  {moment(Date.now()).format('dddd, DD MMMM YYYY')} (dddd, DD
                  MMMM YYYY)
                </option>
                <option value="DD/MMMM/YYYY">
                  {moment(Date.now()).format('DD/MMMM/YYYY')} (DD/MMMM/YYYY)
                </option>
                <option value="DD/MM/YYYY">
                  {moment(Date.now()).format('DD/MM/YYYY')} (DD/MM/YYYY)
                </option>
                <option value="DD/MM/YY">
                  {moment(Date.now()).format('DD/MM/YY')} (DD/MM/YY)
                </option>
              </select>
            </Field>
            <Field>
              <label className="itemLabel">{t('settings:fields:pdfExportDir')}</label>
              <div className="input-group">
                <input
                  className="form-control"
                  name="exportDir"
                  type="text"
                  value={exportDir}
                  disabled
                />
                <a
                  href="#"
                  className="input-group-customized "
                  onClick={this.selectExportDir}
                >
                  <i className="ion-folder" />
                </a>
              </div>
            </Field>
          </Row>
        </Section>
      </div>
    );
//=======
    return [
      <Fields
        key="required_fields_settings"
        required_fields={required_fields}
        handleVisibilityChange={this.handleVisibilityChange}
        t={t}
      />,
      <Tax
        key="tax_settings"
        handleTaxChange={this.handleTaxChange}
        tax={tax}
        t={t}
      />,
      <Currency
        key="currency_settings"
        currency={currency}
        handleCurrencyChange={this.handleCurrencyChange}
        t={t}
      />,
      <Other
        key="other_settings"
        dateFormat={dateFormat}
        exportDir={exportDir}
        template={template}
        handleInputChange={this.handleInputChange}
        selectExportDir={this.selectExportDir}
        t={t}
      />
    ];
//>>>>>>> dev
  }
}

Invoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(Invoice);
