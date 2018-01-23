// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ipc = require('electron').ipcRenderer;
import { keys, sortBy } from 'lodash';
const moment = require('moment');

// Custom Libs
import currencies from '../../../libs/currencies.json';
const openDialog = require('../../renderers/dialog.js');
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  margin: 0 -15px;
`;

const Field = styled.div`
  flex: 1;
  margin: 0 15px 20px 15px;
`;

const Header = styled.h2``;

const Section = styled.div`
  padding: 20px;
  background: #f9fafa;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #f2f3f4;
`;

// Component
class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.invoice;
    this.selectExportDir = this.selectExportDir.bind(this);
    this.sortCurrencies = this.sortCurrencies.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTaxChange = this.handleTaxChange.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.t = this.props.t;
  }

  componentDidMount() {
    ipc.on('no-access-directory', (event, message) => {
      openDialog({
        type: 'warning',
        title: this.t('settings:invoice:noaccess:title'),
        message: message + this.t('settings:invoice:noaccess:message'),
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

  sortCurrencies() {
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
        <label className="itemLabel">{this.t('settings:invoice:tax:heading')}</label>
        <Section>
          <Row>
            <Field>
              <label className="itemLabel">{this.t('settings:invoice:tax:taxid')}</label>
              <input
                name="tin"
                type="text"
                value={tax.tin}
                onChange={this.handleTaxChange}
                placeholder={this.t('settings:invoice:tax:taxidplaceholder')}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <label className="itemLabel">{this.t('settings:invoice:tax:amount')}</label>
              <input
                name="amount"
                type="number"
                step="0.01"
                value={tax.amount}
                onChange={this.handleTaxChange}
                placeholder="Amount"
              />
            </Field>
            <Field>
              <label className="itemLabel">{this.t('settings:invoice:tax:method:heading')}</label>
              <select
                name="method"
                value={tax.method}
                onChange={this.handleTaxChange}
              >
                <option value="default">{this.t('settings:invoice:tax:method:default')}</option>
                <option value="reverse">{this.t('settings:invoice:tax:method:reverse')}</option>
              </select>
            </Field>
          </Row>
        </Section>

        <label className="itemLabel">{this.t('settings:invoice:reqfields:heading')}</label>
        <Section>
          <Row>
            <Field>
              <label className="itemLabel">{this.t('settings:invoice:reqfields:duedate')}</label>
              <label className="switch">
                <input
                  name="dueDate"
                  type="checkbox"
                  checked={required_fields.dueDate}
                  onChange={this.handleVisibilityChange}
                />
                <span className="slider round" />
              </label>
            </Field>
            <Field>
              <label className="itemLabel">{this.t('settings:common:currency')}</label>
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
              <label className="itemLabel">{this.t('settings:invoice:reqfields:discount')}</label>
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
              <label className="itemLabel">{this.t('settings:invoice:reqfields:tax')}</label>
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
              <label className="itemLabel">{this.t('settings:invoice:reqfields:note')}</label>
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

        <label className="itemLabel">{this.t('settings:invoice:other:heading')}</label>
        <Section>
          <Row>
            <Field>
              <label className="itemLabel">{this.t('settings:common:currency')}</label>
              <select
                name="currency"
                value={currency}
                onChange={this.handleInputChange}
              >
                {this.sortCurrencies()}
              </select>
            </Field>
            <Field>
              <label className="itemLabel">{this.t('settings:invoice:other:template:heading')}</label>
              <select
                name="template"
                value={template}
                onChange={this.handleInputChange}
              >
                <option value="minimal">{this.t('settings:invoice:other:template:minimal')}</option>
                <option value="business">{this.t('settings:invoice:other:template:business')}</option>
              </select>
            </Field>
          </Row>
          <Row>
            <Field>
              <label className="itemLabel">{this.t('settings:invoice:other:dateformat')}</label>
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
              <label className="itemLabel">{this.t('settings:invoice:other:exportdir')}</label>
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
  }
}

Invoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(Invoice);
