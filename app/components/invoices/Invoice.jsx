// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const format = require('date-fns/format');
const moment = require('moment');
const _ = require('lodash');

// Custom Libs
const openDialog = require('../../renderers/dialog.js');
import sounds from '../../../libs/sounds.js';

// Styles
import styled from 'styled-components';

const InvoiceContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #f2f3f4;
  padding: 20px;
  flex: 1;
  margin: 0 15px;
  p {
    margin: 0;
    font-size: 16px;
    color: #4f555c;
  }
`;

const InvoiceHeader = styled.div`
  border-bottom: 1px solid #f2f3f4;
  margin-bottom: 10px;
  padding-bottom: 20px;
  display: flex;
`;

const InvoiceLabel = styled.label`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: #b4b7ba;
  display: block;
  margin-top: 10px;
`;

const InvoiceClient = styled.div`
  h3 {
    font-size: 32px;
  }
`;

const InvoiceDates = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InvoiceSum = styled.div``;

const InvoiceActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const InvoiceActionsBtn = styled.a`
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #f2f3f4;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 45%;
  ${props => props.primary && `i { color: #469fe5; }`}
  ${props => props.danger && `i { color: #ec476e; }`}
`;

// Component
class Invoice extends Component {
  constructor(props) {
    super(props);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.previewInvoice = this.previewInvoice.bind(this);
  }

  componentDidMount() {
    const deleteInvoice = this.props.deleteInvoice;
    ipc.on('confirmed-delete-invoice', (event, index, invoiceId) => {
      if (invoiceId === this.props.data._id) {
        if (index === 0) {
          deleteInvoice(invoiceId);
          sounds.play('REMOVE');
        }
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data._id !== nextProps.data._id;
  }

  openDeleteDialog() {
    openDialog(
      {
        type: 'warning',
        title: 'Delete This Invoice',
        message: 'Are You Sure?',
        buttons: ['Yes', 'No'],
      },
      'confirmed-delete-invoice',
      this.props.data._id
    );
  }

  previewInvoice() {
    ipc.send('preview-invoice', this.props.data);
  }

  // Render
  render() {
    const invoice = this.props.data;
    const {recipient} = invoice;
    return (
      <InvoiceContainer>
        <InvoiceHeader>
          <div className="invoiceId">
            <InvoiceLabel>Invoice ID: </InvoiceLabel>
            <p className="invoiceId">
              {_.truncate(invoice._id, {
                length: 8,
                omission: '',
              })}
            </p>
          </div>
          <div className="invoiceStatus" />
        </InvoiceHeader>

        <InvoiceClient>
          <InvoiceLabel>Billed To:</InvoiceLabel>
          <p>
            {recipient.fullname}
          </p>
        </InvoiceClient>

        <InvoiceDates>
          <div className="createdDate">
            <InvoiceLabel>Invoiced Date</InvoiceLabel>
            <p>
              {format(invoice.created_at, 'DD/MM/YYYY')}
            </p>
          </div>
          { invoice.DueDate &&
            <div className="dueDate">
              <InvoiceLabel>Due Date</InvoiceLabel>
              <p>
                {moment(invoice.DueDate).format('DD/MM/YYYY')}
              </p>
            </div>}
        </InvoiceDates>

        <InvoiceSum>
          <InvoiceLabel>Total</InvoiceLabel>
          <p>
            {invoice.currency} {invoice.grandTotal}
          </p>
        </InvoiceSum>

        <InvoiceActions>
          <InvoiceActionsBtn
            primary
            onClick={this.previewInvoice}>
            <i className="ion-search" />
          </InvoiceActionsBtn>
          <InvoiceActionsBtn
            danger
            onClick={this.openDeleteDialog}>
            <i className="ion-android-cancel" />
          </InvoiceActionsBtn>
        </InvoiceActions>
      </InvoiceContainer>
    );
  }
}

Invoice.propTypes = {
  data: PropTypes.object.isRequired,
  deleteInvoice: PropTypes.func.isRequired,
};

export default Invoice;
