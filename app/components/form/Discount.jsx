// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Components
import {Section} from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
const DiscountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const DiscountContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const DiscountAmount = styled.div`flex: 1;`;
const DiscountType = styled.div`
  flex: 1;
  margin-top: 10px;
`;

// Component
export class Discount extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateDiscountState = this.updateDiscountState.bind(this);
  }

  componentWillMount() {
    const {discount} = this.props;
    this.setState({
      amount: discount.amount ? discount.amount : '',
      type: discount.type ? discount.type : 'percentage',
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state !== nextState ||
      this.props.discount !== nextProps.discount
    );
  }

  handleInputChange(event) {
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

  updateDiscountState() {
    const {updateFieldData} = this.props;
    updateFieldData('discount', this.state);
  }

  render() {
    return (
      <Section>
        <DiscountWrapper>
          <label className="itemLabel">Discount</label>
          <DiscountContent>
            <DiscountAmount>
              <input
                name="amount"
                type="number"
                value={this.state.amount}
                onChange={this.handleInputChange}
                placeholder="Amount"
              />
            </DiscountAmount>
            <DiscountType>
              <div className="radio">
                <label>
                  <input
                    name="type"
                    type="radio"
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
                    checked={this.state.type === 'flat'}
                    value="flat"
                  />Flat Rate
                </label>
              </div>
            </DiscountType>
          </DiscountContent>
        </DiscountWrapper>
      </Section>
    );
  }
}

Discount.propTypes = {
  discount: PropTypes.object.isRequired,
  updateFieldData: PropTypes.func.isRequired,
};

// Exports
export default _withFadeInAnimation(Discount);
