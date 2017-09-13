// Electron libs
const ipc = require('electron').ipcRenderer;

// Custom Libs
const openDialog = require('../renderers/dialog.js');

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/invoices';

// Layout
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from '../components/shared/Layout';

// Animation
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Custom Components
import Invoice from '../components/invoices/Invoice';
import Message from '../components/shared/Message';
import {Table, THead, TBody, TH, TR} from '../components/shared/Table';

// Component
class Invoices extends Component {
  constructor(props) {
    super(props);
    this.deleteInvoice = this.deleteInvoice.bind(this);
  }

  // Load Invoices & add event listeners
  componentDidMount() {
    // Get All Invoices
    if (!this.props.invoices.loaded) {
      const {dispatch} = this.props;
      dispatch(Actions.getInvoices());
    }

    // Add Event Listener
    ipc.on('confirmed-delete-invoice', (event, index, invoiceId) => {
      if (index === 0) {
        this.confirmedDeleteInvoice(invoiceId);
      }
    });
  }

  // Optimization
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.invoices !== nextProps.invoices;
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
    const {dispatch} = this.props;
    dispatch(Actions.deleteInvoice(invoiceId));
  }

  // Open Confirm Dialog
  deleteSelectedInvoices() {
    openDialog(
      {
        type: 'warning',
        title: 'Delete These Invoices',
        message: 'Are You Sure?',
        buttons: ['Yes', 'No'],
      },
      'confirmed-delete-invoice',
      this.state.selectedItems
    );
  }

  // Render
  render() {
    const {invoices} = this.props;
    const invoicesComponent = invoices.data.map((invoice, index) => {
      return (
        <Invoice
          key={invoice._id}
          deleteInvoice={this.deleteInvoice}
          index={index}
          data={invoice}
        />
      );
    });
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>All Invoices</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          {invoices.data.length === 0
            ? <Message info text="You don't have any invoice yet" />
            : <Table hasBorders bg>
                <THead>
                  <TR>
                    <TH>ID</TH>
                    <TH>Client</TH>
                    <TH>DueDate</TH>
                    <TH>Created</TH>
                    <TH>Value</TH>
                    <TH actions>Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {invoicesComponent}
                </TBody>
              </Table>}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Invoices.propTypes = {
  dispatch: PropTypes.func.isRequired,
  invoices: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    data: PropTypes.array,
  }).isRequired,
};

// Export
export default compose(
  connect(state => ({invoices: state.InvoicesReducer})),
  _withFadeInAnimation
)(Invoices);
