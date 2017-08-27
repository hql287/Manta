// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

// Styles
import styled from 'styled-components';
const DiscountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const DiscountContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DiscountAmount = styled.div`
  flex: 1;
  width: 50%;
`;

const DiscountType = styled.div`
  flex: 1;
  margin-top: 10px;
`;

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
    const {discount} = this.props.currentInvoice;
    const amount = discount.amount ? discount.amount : 0;
    const type = discount.type ? discount.type : 'percentage';
    return (
      <DiscountWrapper>
        <label className="itemLabel">Discount</label>
        <DiscountContent>
          <DiscountAmount>
            <input
              type="number"
              value={amount}
              onChange={this.updateAmount.bind(this)}
              placeholder="Amount"
            />
          </DiscountAmount>
          <DiscountType>
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
          </DiscountType>
        </DiscountContent>
      </DiscountWrapper>
    );
  };
}

export default connect(state => ({
  currentInvoice: state.FormReducer,
}))(Discount);
