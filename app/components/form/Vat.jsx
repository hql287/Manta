// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Components
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

// Component
export class Vat extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    const {vat} = this.props;
    this.setState({
      amount: vat.amount ? vat.amount : '',
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state !== nextState ||
      this.props.vat !== nextProps.vat
    );
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value =
      event.target.value === '' ? '' : parseInt(event.target.value, 10);
    this.setState({[name]: value}, () => {
      this.updateVatState();
    });
  }

  updateVatState() {
    const {updateFieldData} = this.props;
    updateFieldData('vat', this.state);
  }

  render() {
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
                onChange={this.handleInputChange}
                placeholder="Amount"
              />
            </VatAmount>
          </VatContent>
        </VatWrapper>
      </Section>
    );
  }
}

Vat.propTypes = {
  updateFieldData: PropTypes.func.isRequired,
  vat: PropTypes.object.isRequired,
};

// Exports
export default _withFadeInAnimation(Vat);
