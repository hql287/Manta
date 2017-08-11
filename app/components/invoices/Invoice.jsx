// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const format = require('date-fns/format')
const _ = require('lodash');

// Custom Libs
const openDialog = require('../../renderers/dialog.js');
import sounds from '../../../libs/sounds.js';

// Component
class Invoice extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleteInvoice: PropTypes.func.isRequired,
  };

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
    openDialog({
      type: 'warning',
      title: 'Delete This Invoice',
      message: 'Are You Sure?',
      buttons: ['Yes', 'No']
    }, 'confirmed-delete-invoice', invoiceId);
  }

  // Preview Invoice
  previewInvoice = () => ipc.send('preview-invoice', this.props.data);

  // Render
  render = () => {
    const invoice = this.props.data;
    return (
      <div className="invoice">
        <span className="invoiceNumber">
          {this.props.index + 1}
        </span>

        <a href="#" className="invoiceId" onClick={() => this.previewInvoice()}>
          {_.truncate(invoice._id, {
            length: 8,
            omission: '',
          })}
        </a>

        <span className="invoiceCreatedAt">
          <span>
            {format(invoice.created_at, 'DD-MM-YYYY')}
          </span>
          <span className="text-muted">
            {format(invoice.created_at, 'HH:mm')}
          </span>
        </span>

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
    );
  };
}

export default Invoice;
