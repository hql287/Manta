// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReceiptsActionCreators from '../actions/receipts.jsx';
import * as FormActionCreators from '../actions/form.jsx';

// Custom Libs
import sounds from '../../libs/sounds.js';
const openDialog = require('../renderers/dialog.js');

// Components
import ItemsList from '../components/form/ItemsList.jsx';
import Currency from '../components/form/Currency.jsx';
import Discount from '../components/form/Discount.jsx';
import Note from '../components/form/Note.jsx';

// Component
class Form extends Component {

  // Save Data
  saveReceipt = () => {
    // Validate Form
    if (!this.validateForm()) return;
    // Dispatch Action
    const {dispatch} = this.props;
    const saveReceipt = bindActionCreators(
      ReceiptsActionCreators.saveReceipt,
      dispatch,
    );
    const currentReceipt = this.props.currentReceipt;
    saveReceipt(currentReceipt);
    // Clear The Form
    this.clearForm('muted');
    // Play a Sound
    sounds.play('ADD');
  };

  // Clear The Form
  clearForm = (vol) => {
    // Dispatch Clear Form Action
    const {dispatch} = this.props;
    const clearForm = bindActionCreators(
      FormActionCreators.clearForm,
      dispatch,
    );
    clearForm();
    // Play A Sound
    if (!vol) sounds.play('RELOAD');
  };

  // Validate Form
  validateForm = () => {
    let validated = true;
    // Validate Each Row Content
    const { rows } = this.props.currentReceipt;
    for ( let i = 0; i < rows.length; i++ ) {
      let row = rows[i];
      // Does it contain description?
      if (!row.description) {
        openDialog({
          type: 'warning',
          title: 'Required Field',
          message: 'Description can not be blank',
        })
        validated = false;
        break;
      }
      // Is the price presented and greater than 0?
      if (!row.price || row.price === 0) {
        openDialog({
          type: 'warning',
          title: 'Required Field',
          message: 'Price must be greater than 0',
        })
        validated = false;
        break;
      }
      // Is the quantity presented and greater than 0?
      if (!row.quantity || row.quantity === 0) {
        openDialog({
          type: 'warning',
          title: 'Required Field',
          message: 'Quantity must be greater than 0',
        })
        validated = false;
        break;
      }
    }
    return validated;
  }

  // Render The form
  render = () => {
    return (
      <div className="pageWrapper">
        <div className="pageHeader">
          <h4>New Receipt</h4>
        </div>
        <div className="pageContent">
          <ItemsList saveData={this.saveData}/>
          <Currency defaultCurrency={this.props.settings.current.appSettings.currency}/>
          <Discount/>
          <Note />
        </div>
        <div className="pageFooter">
          <a href="#" onClick={() => this.saveReceipt()}>
            <i className="ion-android-checkmark-circle" />
          </a>
          <a href="#" onClick={() => this.clearForm()}>
            <i className="ion-ios-loop-strong" />
          </a>
        </div>
      </div>
    );
  };

}

export default connect(state => ({
  currentReceipt: state.FormReducer,
  receipts: state.ReceiptsReducer,
  settings: state.SettingsReducer,
}))(Form);
