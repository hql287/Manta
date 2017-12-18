// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';

const appConfig = require('electron').remote.require('electron-settings');

const format = require('date-fns/format');
const moment = require('moment');
const ipc = require('electron').ipcRenderer;

// Helper
import { formatNumber } from '../../helpers/number';

// Custom Components
import {TR, TD} from '../shared/Table';
import Button from '../shared/Button';

// Component
class Invoice extends Component {
  constructor(props) {
    super(props);
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.previewInvoice = this.previewInvoice.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  deleteInvoice() {
    const {invoice, deleteInvoice} = this.props;
    deleteInvoice(invoice._id);
  }

  previewInvoice() {
    ipc.send('preview-invoice', this.props.invoice);
  }

  // Render
  render() {
    const { invoice } = this.props;
    const dateFormat = appConfig.get('appSettings.dateFormat');
    const { recipient } = invoice;
    return (
      <TR>
        <TD>
          {truncate(invoice._id, {
            length: 8,
            omission: '',
          })}
        </TD>
        <TD bold>
          {recipient.fullname}
        </TD>
        <TD>
          {invoice.dueDate
            ? moment(invoice.dueDate).format(dateFormat)
            : '--'}
        </TD>
        <TD muted>
          {format(invoice.created_at, dateFormat)}
        </TD>
        <TD bold success>
          {invoice.currency.code}
          {'\u00A0'}
          {formatNumber(invoice.grandTotal)}
        </TD>
        <TD actions>
          <Button link primary onClick={this.previewInvoice}>
            <i className="ion-search" />
          </Button>
          <Button link danger onClick={this.deleteInvoice}>
            <i className="ion-close-circled" />
          </Button>
        </TD>
      </TR>
    );
  }
}

Invoice.propTypes = {
  deleteInvoice: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default Invoice;
