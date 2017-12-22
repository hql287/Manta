// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Components
import {Section} from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
const TaxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TaxContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const TaxAmount = styled.div`flex: 1;`;

// Component
export class Tax extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    const {tax} = this.props;
    this.setState({
      amount: tax.amount ? tax.amount : '',
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state !== nextState ||
      this.props.tax !== nextProps.tax
    );
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value =
      event.target.value === '' ? '' : parseInt(event.target.value, 10);
    this.setState({[name]: value}, () => {
      this.updateTaxState();
    });
  }

  updateTaxState() {
    const {updateFieldData} = this.props;
    updateFieldData('tax', this.state);
  }

  render() {
    return (
      <Section>
        <TaxWrapper>
          <label className="itemLabel">Tax (%)</label>
          <TaxContent>
            <TaxAmount>
              <input
                name="amount"
                type="number"
                value={this.state.amount}
                onChange={this.handleInputChange}
                placeholder="Amount"
              />
            </TaxAmount>
          </TaxContent>
        </TaxWrapper>
      </Section>
    );
  }
}

Tax.propTypes = {
  updateFieldData: PropTypes.func.isRequired,
  tax: PropTypes.object.isRequired,
};

// Exports
export default _withFadeInAnimation(Tax);
