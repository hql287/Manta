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
`;

const DiscountType = styled.div`
  flex: 1;
  margin-top: 10px;
`;

// Component
class Discount extends Component {

  componentWillMount = () => {
    const { discount } = this.props.currentInvoice;
    this.setState({
      amount: discount.amount ? discount.amount : '',
      type: discount.type ? discount.type : 'percentage',
    });
  }

  handleInputChange = event => {
    const name = event.target.name;
    const eValue = event.target.value;
    let value;
    if (name !== 'amount') {
      value = eValue;
    } else {
      value = eValue === '' ? '' : parseInt(eValue, 10);
    }
    this.setState({[name]: value}, () => {
      this.updateDiscountState();
    });
  }

  updateDiscountState = () => {
    const {dispatch} = this.props;
    const updateDiscount = bindActionCreators(
      ActionCreators.updateDiscount,
      dispatch,
    );
    updateDiscount(this.state);
  };

  render = () => {
    const {discount} = this.props.currentInvoice;
    return (
      <DiscountWrapper>
        <label className="itemLabel">Discount</label>
        <label className="switch">
          <input
            name="required"
            type="checkbox"
            checked={discount.required}
            onChange={() => this.props.toggleField('discount')}
          />
          <span className="slider round"></span>
        </label>
        { discount.required &&
          <DiscountContent>
            <DiscountAmount>
              <input
                name="amount"
                type="number"
                value={this.state.amount}
                onChange={e => this.handleInputChange(e)}
                placeholder="Amount"
              />
            </DiscountAmount>
            <DiscountType>
              <div className="radio">
                <label>
                  <input
                    name="type"
                    type="radio"
                    onChange={e => this.handleInputChange(e)}
                    checked={this.state.type === 'percentage'}
                    value="percentage"
                  />Percentage
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    name="type"
                    type="radio"
                    onChange={e => this.handleInputChange(e)}
                    checked={this.state.type === 'flat'}
                    value="flat"
                  />Flat Rate
                </label>
              </div>
            </DiscountType>
          </DiscountContent>}
      </DiscountWrapper>
    );
  };
}

export default connect(state => ({
  currentInvoice: state.FormReducer,
}))(Discount);
