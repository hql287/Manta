// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
const ipc = require('electron').ipcRenderer;
import {keys, sortBy} from 'lodash';

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
  }

  componentDidMount() {
    ipc.on('no-access-directory', (event, message) => {
      openDialog({
        type: 'warning',
        title: 'No Access Permisison',
        message: `${message}. Please choose a different directory!`,
      });
    });

    ipc.on('confirmed-export-directory', (event, path) => {
      this.setState({exportDir: path}, () => {
        this.props.updateSettings('appSettings', this.state);
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
    this.setState({[name]: value}, () => {
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
      },
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
      },
    );
  }

  selectExportDir() {
    ipc.send('select-export-directory');
  }

  sortCurrencies() {
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
    const {exportDir, template, currency, tax, required_fields} = this.state;

    return (
      <div>
        <label className='itemLabel'>Tax Settings</label>
        <Section>
          <Row>
            <Field>
              <label className='itemLabel'>Tax ID</label>
              <input
                name='tin'
                type='text'
                value={tax.tin}
                onChange={this.handleTaxChange}
                placeholder="Registration Number"
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <label className='itemLabel'>Tax Amount</label>
              <input
                name='amount'
                type='number'
                step='0.01'
                value={tax.amount}
                onChange={this.handleTaxChange}
                placeholder="Amount"
              />
            </Field>
            <Field>
              <label className='itemLabel'>Tax Method</label>
              <select
                name='method'
                value={tax.method}
                onChange={this.handleTaxChange}>
                <option value='default'>Default</option>
                <option value='reverse'>Reverse Charge</option>
              </select>
            </Field>
          </Row>
        </Section>

        <label className='itemLabel'>Required Fields</label>
        <Section>
          <Row>
            <Field>
              <label className='itemLabel'>Due Date</label>
              <label className='switch'>
                <input
                  name='dueDate'
                  type='checkbox'
                  checked={required_fields.dueDate}
                  onChange={this.handleVisibilityChange}
                />
                <span className='slider round' />
              </label>
            </Field>
            <Field>
              <label className='itemLabel'>Currency</label>
              <label className='switch'>
                <input
                  name='currency'
                  type='checkbox'
                  checked={required_fields.currency}
                  onChange={this.handleVisibilityChange}
                />
                <span className='slider round' />
              </label>
            </Field>

            <Field>
              <label className='itemLabel'>Discount</label>
              <label className='switch'>
                <input
                  name='discount'
                  type='checkbox'
                  checked={required_fields.discount}
                  onChange={this.handleVisibilityChange}
                />
                <span className='slider round' />
              </label>
            </Field>
            <Field>
              <label className='itemLabel'>Tax</label>
              <label className='switch'>
                <input
                  name='tax'
                  type='checkbox'
                  checked={required_fields.tax}
                  onChange={this.handleVisibilityChange}
                />
                <span className='slider round' />
              </label>
            </Field>
            <Field>
              <label className='itemLabel'>Note</label>
              <label className='switch'>
                <input
                  name='note'
                  type='checkbox'
                  checked={required_fields.note}
                  onChange={this.handleVisibilityChange}
                />
                <span className='slider round' />
              </label>
            </Field>
          </Row>
        </Section>

        <label className='itemLabel'>Other</label>
        <Section>
          <Row>
            <Field>
              <label className='itemLabel'>Currency</label>
              <select
                name='currency'
                value={currency}
                onChange={this.handleInputChange}>
                {this.sortCurrencies()}
              </select>
            </Field>
            <Field>
              <label className='itemLabel'>Template</label>
              <select
                name='template'
                value={template}
                onChange={this.handleInputChange}>
                <option value='minimal'>Minimal</option>
                <option value='business'>Business</option>
              </select>
            </Field>
          </Row>
          <Row>
            <Field>
              <label className='itemLabel'>PDF Export Directory</label>
              <div className='input-group'>
                <input
                  className='form-control'
                  name='exportDir'
                  type='text'
                  value={exportDir}
                  disabled
                />
                <a
                  href='#'
                  className='input-group-customized '
                  onClick={this.selectExportDir}>
                  <i className='ion-folder' />
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
