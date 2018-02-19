// Libraries
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import { Section } from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
const NoteContent = styled.textarea`
  min-height: 36px;
  border-radius: 4px;
  padding: 10px;
  display: block;
  width: 100%;
  border: 1px solid #f2f3f4;
  color: #3a3e42;
  font-size: 14px;
`;

// Component
export class InvoiceID extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { invoiceID: this.props.invoiceID };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.invoiceID === "") {
      this.setState({ invoiceID: "" });
    }
  }

  handleInputChange(event) {
    this.setState({ invoiceID: event.target.value }, () => {
      this.props.updateFieldData('invoiceID', this.state.invoiceID);
    });
  }

  render() {
    const { t } = this.props;
    return (
      <Section>
        <label className="itemLabel">{t('invoices:fields:invoiceID')}</label>
        <input
          name="invoiceID"
          type="text"
          onChange={this.handleInputChange}
          value={this.state.invoiceID}
        />
      </Section>
    );
  }
}

InvoiceID.propTypes = {
  invoiceID: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  updateFieldData: PropTypes.func.isRequired,
};

// Export
export default _withFadeInAnimation(InvoiceID);
