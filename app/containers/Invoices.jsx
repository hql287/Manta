// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/invoices';

// Custom Libs
const openDialog = require('../renderers/dialog.js');
import sounds from '../../libs/sounds.js';

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

// Styles
import styled from 'styled-components';

const InvoicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

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
        sounds.play('REMOVE');
      }
    });
  }

  // Optimization
  shouldComponentUpdate(nextProps) {
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
            ? <Message info text="You don't have any invoice yet"/>
            : <InvoicesContainer>
                {invoicesComponent}
              </InvoicesContainer>}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Invoices.propTypes = {
  invoices: PropTypes.object.isRequired,
};

// Export
export default compose(
  connect(state => ({ invoices: state.InvoicesReducer })),
  _withFadeInAnimation
)(Invoices);
