// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

// Component
class Discount extends Component {

  // Update Discount Amount
  updateAmount = event => {
    const amount = parseInt(event.target.value, 10);
    const {dispatch} = this.props;
    const updateDiscountAmount = bindActionCreators(
      ActionCreators.updateDiscountAmount,
      dispatch,
    );
    updateDiscountAmount(amount);
  };

  // Update Discount Type
  updateType = event => {
    const {dispatch} = this.props;
    const updateDiscountType = bindActionCreators(
      ActionCreators.updateDiscountType,
      dispatch,
    );
    updateDiscountType(event.target.value);
  };

  render = () => {
    const {discount} = this.props.currentReceipt;
    const amount = discount.amount ? discount.amount : 0;
    const type = discount.type ? discount.type : 'percentage';
    return (
      <div className="discountWrapper">
        <label className="itemLabel ">Discount</label>

        <div className="discountContent">
          <div className="discountAmount">
            <input
              type="number"
              value={amount}
              onChange={this.updateAmount.bind(this)}
              placeholder="Amount"
            />
          </div>

          <div className="discountType">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  onChange={this.updateType.bind(this)}
                  checked={type === 'percentage'}
                  value="percentage"
                />Percentage
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  onChange={this.updateType.bind(this)}
                  checked={type === 'flat'}
                  value="flat"
                />Flat Rate
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default connect(state => ({
  currentReceipt: state.FormReducer,
}))(Discount);
