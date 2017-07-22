// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReceiptsActionCreators from '../actions/receipts.jsx';
import * as FormActionCreators from '../actions/form.jsx';

// Components
import ItemsList from '../components/form/ItemsList.jsx';
import Discount from '../components/form/Discount.jsx';
import Note from '../components/form/Note.jsx';

// Component
class Form extends Component {
  // Save Data
  saveReceipt = () => {
    const {dispatch} = this.props;
    const saveReceipt = bindActionCreators(
      ReceiptsActionCreators.saveReceipt,
      dispatch,
    );
    const currentReceipt = this.props.currentReceipt;
    saveReceipt(currentReceipt);
  };

  clearForm = () => {
    const {dispatch} = this.props;
    const clearForm = bindActionCreators(
      FormActionCreators.clearForm,
      dispatch,
    );
    clearForm();
  };

  render = () => {
    return (
      <div className="pageWrapper">
        <div className="pageHeader">
          <h4>New Receipt</h4>
        </div>
        <div className="pageContent">
          <ItemsList saveData={this.saveData} />
          <Discount />
          <Note />
        </div>
        <div className="pageFooter">
          <a href="#" onClick={() => this.saveReceipt()}>
            <i className="ion-android-checkmark-circle" />
          </a>
          <a href="#" onClick={() => this.clearForm()}>
            <i className="ion-trash-b" />
          </a>
        </div>
      </div>
    );
  };
}

export default connect(state => ({
  receipts: state.ReceiptsReducer,
  currentReceipt: state.FormReducer,
}))(Form);
