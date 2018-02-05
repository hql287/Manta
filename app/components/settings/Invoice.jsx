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
  }
}

Invoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(Invoice);
