// Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../actions/receipts.jsx';

// Component
class Home extends Component {
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

  deleteReceipt = id => {
    const {dispatch} = this.props;
    const deleteReceipt = bindActionCreators(
      ActionCreators.deleteReceipt,
      dispatch,
    );
    deleteReceipt(id);
  }

  render = () => {
    const { receipts }  = this.props
    const receiptsComponent = receipts.data.map(receipt => {
      return (
        <div key={receipt._id}>
          <p>
            {receipt._id}
          </p>
          <a href="#" onClick={() => this.deleteReceipt(receipt._id)}>Remove</a>
        </div>
      );
    })
    return (
      <div>
        <h1>Home</h1>
        { receiptsComponent }
      </div>
    );
  };
}

export default connect(state => ({
  receipts: state.ReceiptsReducer,
}))(Home);
