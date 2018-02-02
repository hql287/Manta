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
    const { setSavable } = this.props;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const canSave = this.canSave(name, value);
    setSavable(canSave);
    if (!canSave) {
      // Notifi
      console.log('Cant save');
    }

    this.setState({ [name]: value }, () => {
      this.props.updateSettings('invoice', this.state);
    });
  }

  canSave(ctrlName, value) {
    let valid = true;
    if (ctrlName === 'decimalFractions' && Number(value) < 0) {
      valid = false;
      openDialog({
        type: 'warning',
        title: 'Invalid decimal fraction setting',
        message: `${value} is an invalid for decimal fractions! Please correct setting to continue.`,
      });
    }

    return valid;
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

  render() {
    const {
      exportDir,
      template,
      currency,
      tax,
      required_fields,
      dateFormat,
      decimalFractions,
      currencyPlacement,
      decimalSeparator,
    } = this.state;
    return [
      <Fields
        key="required_fields_settings"
        required_fields={required_fields}
        handleVisibilityChange={this.handleVisibilityChange}
      />,
      <Tax
        key="tax_settings"
        handleTaxChange={this.handleTaxChange}
        tax={tax}
      />,
      <Currency
        key="currency_settings"
        currency={currency}
        handleInputChange={this.handleInputChange}
        decimalSeparator={decimalSeparator}
        currencyPlacement={currencyPlacement}
        decimalFractions={decimalFractions}
      />,
      <Other
        key="other_settings"
        dateFormat={dateFormat}
        exportDir={exportDir}
        template={template}
        handleInputChange={this.handleInputChange}
        selectExportDir={this.selectExportDir}
      />
    ];
  }
}

Invoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(Invoice);
