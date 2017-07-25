// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../actions/receipts.jsx';

// Custom Components
import Receipt from '../components/receipts/Receipt.jsx';
import EmptyMessage from '../components/receipts/EmptyMessage.jsx';

// Component
class Home extends Component {

  state = { hint: '' }

  // Will Mount
  componentWillMount = () => {
    if (!this.props.receipts.loaded) {
      const {dispatch} = this.props;
      const getReceipts = bindActionCreators(
        ActionCreators.getReceipts,
        dispatch,
      );
      getReceipts();
    }
  };

  // Remove all IPC listeners once all reciepts are removed
  // Or the container is unmounted
  componentWillUnmount() {
    ipc.removeAllListeners('confirmed-delete-receipt');
  }

  // Delete a receipt
  deleteReceipt = id => {
    // Dispatch Action
    const {dispatch} = this.props;
    const deleteReceipt = bindActionCreators(
      ActionCreators.deleteReceipt,
      dispatch,
    );
    deleteReceipt(id);
    // Show hint
    this.showHint('Receipt Deleted!');
  };

  // Show Empty Message
  showEmptyMessage = () => {
    const {receipts} = this.props;
    return receipts.data.length === 0;
  };

  // Show Page Hint
  showHint = content => {
    this.setState({ hint: content }, () => {
      document.getElementById('pageFooterHint').classList.add('active');
    })
  }

  // Hide Page hint
  hideHint = () => {
    document.getElementById('pageFooterHint').classList.remove('active');
    this.setState({ hint: '' });
  }

  // Render
  render = () => {
    const {receipts} = this.props;
    const receiptsComponent = receipts.data.map((receipt, index) => {
      return (
        <Receipt
          key={receipt._id}
          deleteReceipt={this.deleteReceipt}
          index={index}
          data={receipt}
        />
      );
    });
    return (
      <div className="pageWrapper">
        <div className="pageHeader">
          <h4>All Receipts</h4>
        </div>
        {this.showEmptyMessage()
          ? <EmptyMessage />
          : <div className="pageContent">
              <div className="pageLabels">
                <div className="itemLabelNumner">
                  <label className="itemLabel">#</label>
                </div>
                <div className="itemLabelId">
                  <label className="itemLabel">Id</label>
                </div>
                <div className="itemLabelDate">
                  <label className="itemLabel ">Created Date</label>
                </div>
                <div className="itemLabelActions" />
              </div>
              { receiptsComponent }
            </div>}
        <div className="pageFooter">
          <div id="pageFooterHint" className="pageFooterHint">
            <span> { this.state.hint }</span>
            <a href="#" onClick={() => this.hideHint()}>
              <i className="ion-close"></i>
            </a>
          </div>
        </div>
      </div>
    );
  };
}

export default connect(state => ({
  receipts: state.ReceiptsReducer,
}))(Home);
