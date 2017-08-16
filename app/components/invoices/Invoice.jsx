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

// Component
class Invoice extends Component {
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

  openDeleteDialog = invoiceId => {
    openDialog(
      {
        type: 'warning',
        title: 'Delete This Invoice',
        message: 'Are You Sure?',
        buttons: ['Yes', 'No'],
      },
      'confirmed-delete-invoice',
      invoiceId,
    );
  };

  // Preview Invoice
  previewInvoice = () => ipc.send('preview-invoice', this.props.data);

  // Render
  render = () => {
    const invoice = this.props.data;
    const {recipient} = invoice;
    return (
      <div className="col-md-6">
        <div className="invoice">
          <div className="invoiceHeader">
            <div className="invoiceId">
              <label className="invoiceLabel">Invoice ID:</label>
              <p className="invoiceId">
                {_.truncate(invoice._id, {
                  length: 8,
                  omission: '',
                })}
              </p>
            </div>
            <div className="invoiceStatus" />
          </div>

          <div className="invoiceClient">
            <label className="invoiceLabel">Billed To:</label>
            <p>
              {recipient.fullname}
            </p>
          </div>

          <div className="invoiceDates">
            <div className="createdDate">
              <label className="invoiceLabel">Invoiced Date</label>
              <p>
                {format(invoice.created_at, 'DD/MM/YYYY')}
              </p>
            </div>
            <div className="dueDate">
              <label className="invoiceLabel">Due Date</label>
              <p>
                {moment(invoice.DueDate).format('DD/MM/YYYY')}
              </p>
            </div>
          </div>

          <div className="invoiceSum">
            <label className="invoiceLabel">Total</label>
            <p>
              {invoice.currency} {invoice.grandTotal}
            </p>
          </div>

          <div className="invoiceActions">
            <a
              href="#"
              className="previewInvoice"
              onClick={() => this.previewInvoice()}>
              <i className="ion-search" />
            </a>
            <a
              href="#"
              className="removeInvoice"
              onClick={() => this.openDeleteDialog(invoice._id)}>
              <i className="ion-android-cancel" />
            </a>
          </div>
        </div>
      </div>
    );
  };
}

Invoice.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteInvoice: PropTypes.func.isRequired,
};

export default Invoice;
