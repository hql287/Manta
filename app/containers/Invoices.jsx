// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
const openDialog = require('../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;
import { translate } from 'react-i18next';

// Actions
import * as Actions from '../actions/invoices';

// Selectors
import { getInvoices } from '../reducers/InvoicesReducer';
import { getDateFormat } from '../reducers/SettingsReducer';

// Components
import Invoice from '../components/invoices/Invoice';
import Message from '../components/shared/Message';
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from '../components/shared/Layout';

class Invoices extends PureComponent {
  constructor(props) {
    super(props);
    this.editInvoice = this.editInvoice.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.setInvoiceStatus = this.setInvoiceStatus.bind(this);
  }

  // Load Invoices & add event listeners
  componentDidMount() {
    // Add Event Listener
    ipc.on('confirmed-delete-invoice', (event, index, invoiceId) => {
      if (index === 0) {
        this.confirmedDeleteInvoice(invoiceId);
      }
    });
  }

  // Remove all IPC listeners when unmounted
  componentWillUnmount() {
    ipc.removeAllListeners('confirmed-delete-invoice');
  }

  // Open Confirm Dialog
  deleteInvoice(invoiceId) {
    openDialog(
      {
        type: 'warning',
        title: 'Delete This Invoice',
        message: 'Are You Sure?',
        buttons: ['Yes', 'No'],
      },
      'confirmed-delete-invoice',
      invoiceId
    );
  }

  // Confirm Delete an invoice
  confirmedDeleteInvoice(invoiceId) {
    const { dispatch } = this.props;
    dispatch(Actions.deleteInvoice(invoiceId));
  }

  // set the invoice status
  setInvoiceStatus(invoiceId, status) {
    const { dispatch } = this.props;
    dispatch(Actions.setInvoiceStatus(invoiceId, status));
  }

  editInvoice(invoice) {
    const { dispatch } = this.props;
    dispatch(Actions.editInvoice(invoice));
  }

  // Render
  render() {
    const { t, invoices, dateFormat } = this.props;
    const invoicesComponent = invoices.map((invoice, index) => (
      <Invoice
        t={t}
        key={invoice._id}
        deleteInvoice={this.deleteInvoice}
        editInvoice={this.editInvoice}
        setInvoiceStatus={this.setInvoiceStatus}
        index={index}
        dateFormat={dateFormat}
        invoice={invoice}
      />
    ));
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>{t('invoices:header:name')}</PageHeaderTitle>
        </PageHeader>
        <PageContent bare>
          {invoices.length === 0 ? (
            <Message info text={t('messages:noInvoice')} />
          ) : (
            <div className="row">{invoicesComponent}</div>
          )}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Invoices.propTypes = {
  dispatch: PropTypes.func.isRequired,
  invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Map state to props & Export
const mapStateToProps = state => ({
  invoices: getInvoices(state),
  dateFormat: getDateFormat(state),
});

export default compose(
  connect(mapStateToProps),
  translate(['common', 'form', 'invoices']),
  _withFadeInAnimation
)(Invoices);
