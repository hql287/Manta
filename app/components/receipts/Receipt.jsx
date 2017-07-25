// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';

// Redux
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/receipts.jsx';

// 3rd Party Libs
const _ = require('lodash');
const format = require('date-fns/format')

// Custom Libs
const openDialog = require('../../renderers/dialog.js');
import sounds from '../../../libs/sounds.js';

// Component
class Receipt extends Component {

  componentDidMount() {
    const deleteReceipt = this.props.deleteReceipt;
    ipc.on('confirmed-delete-receipt', (event, index, receiptId) => {
      if (receiptId === this.props.data._id) {
        if (index === 0) {
          deleteReceipt(receiptId);
          sounds.play('REMOVE');
        }
      }
    });
  }

  openDeleteDialog = receiptId => {
    openDialog({
      type: 'warning',
      title: 'Delete This Receipt',
      message: 'Are You Sure?',
      buttons: ['Yes', 'No']
    }, 'confirmed-delete-receipt', receiptId);
  }

  // Preview Receipt
  previewReceipt = () => {
    console.log('Previewing');
  };

  // Render
  render = () => {
    const receipt = this.props.data;
    return (
      <div className="receipt">
        <span className="receiptNumber">
          {this.props.index + 1}
        </span>

        <a href="#" className="receiptId" onClick={() => this.previewReceipt()}>
          {_.truncate(receipt._id, {
            length: 8,
            omission: '',
          })}
        </a>

        <span className="receiptCreatedAt">
          <span>
            {format(receipt.created_at, 'DD-MM-YYYY')}
          </span>
          <span className="text-muted">
            {format(receipt.created_at, 'HH:mm')}
          </span>
        </span>

        <div className="receiptActions">
          <a
            href="#"
            className="previewReceipt"
            onClick={() => this.previewReceipt()}>
            <i className="ion-search" />
          </a>
          <a
            href="#"
            className="removeReceipt"
            onClick={() => this.openDeleteDialog(receipt._id)}>
            <i className="ion-android-cancel" />
          </a>
        </div>
      </div>
    );
  };
}

export default Receipt;
