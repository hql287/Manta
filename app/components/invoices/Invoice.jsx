// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const format = require('date-fns/format');
const moment = require('moment');
const _ = require('lodash');

// Custom Component
import {TR, TD} from '../shared/Table';

// Component
class Invoice extends Component {
  constructor(props) {
    super(props);
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.previewInvoice = this.previewInvoice.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data._id !== nextProps.data._id;
  }

  deleteInvoice() {
    const {data, deleteInvoice} = this.props;
    deleteInvoice(data._id);
  }

  previewInvoice() {
    ipc.send('preview-invoice', this.props.data);
  }

  // Render
  render() {
    const invoice = this.props.data;
    const {recipient} = invoice;
    return (
      <TR>
        <TD>
          {_.truncate(invoice._id, {
            length: 8,
            omission: '',
          })}
        </TD>
        <TD bold>
          {recipient.fullname}
        </TD>
        <TD>
          {invoice.dueDate
            ? moment(invoice.dueDate).format('DD/MM/YYYY')
            : '--'}
        </TD>
        <TD muted>
          {format(invoice.created_at, 'DD/MM/YYYY')}
        </TD>
        <TD bold success>
          {invoice.currency} {invoice.grandTotal}
        </TD>
        <TD actions>
          <a href="#" onClick={this.previewInvoice}>
            <i className="ion-search" />
          </a>
          <a href="#" onClick={this.deleteInvoice}>
            <i className="ion-android-cancel" />
          </a>
        </TD>
      </TR>
    );
  }
}

Invoice.propTypes = {
  data: PropTypes.object.isRequired,
  deleteInvoice: PropTypes.func.isRequired,
};

export default Invoice;
