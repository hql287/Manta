// Libraries
import React, {Component} from 'react';

// Custom Components
import Switch from '../shared/Switch';
import {Section} from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
const VatWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const VatAmount = styled.div`flex: 1;`;

const VatType = styled.div`
  flex: 1;
  margin-top: 10px;
`;

// Component
class Vat extends Component {
  componentWillMount = () => {
    const {vat} = this.props;
    this.setState({
      amount: vat.amount ? vat.amount : '',
    });
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value =
      event.target.value === '' ? '' : parseInt(event.target.value, 10);
    this.setState({[name]: value}, () => {
      this.updateVatState();
    });
  };

  updateVatState = () => {
    const {updateFieldData} = this.props;
    updateFieldData('vat', this.state);
  };

  render = () => {
    return (
      <Section>
        <VatWrapper>
          <label className="itemLabel">Vat (%)</label>
          <VatContent>
            <VatAmount>
              <input
                name="amount"
                type="number"
                value={this.state.amount}
                onChange={e => this.handleInputChange(e)}
                placeholder="Amount"
              />
            </VatAmount>
          </VatContent>
        </VatWrapper>
      </Section>
    );
  };
}

// Exports
export default _withFadeInAnimation(Vat);
