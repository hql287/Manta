import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Field, Part } from '../../../shared/Part';

function Tax({ tax, handleTaxChange }) {
  return [
    <label key="label" className="itemLabel">
      Tax Settings
    </label>,
    <Part key="part">
      <Row>
        <Field>
          <label className="itemLabel">Tax ID</label>
          <input
            name="tin"
            type="text"
            value={tax.tin}
            onChange={handleTaxChange}
            placeholder="Registration Number"
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">Tax Amount</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            value={tax.amount}
            onChange={handleTaxChange}
            placeholder="Amount"
          />
        </Field>
        <Field>
          <label className="itemLabel">Tax Method</label>
          <select name="method" value={tax.method} onChange={handleTaxChange}>
            <option value="default">Default</option>
            <option value="reverse">Reverse Charge</option>
          </select>
        </Field>
      </Row>
    </Part>,
  ];
}

Tax.propTypes = {
  tax: PropTypes.object.isRequired,
  handleTaxChange: PropTypes.func.isRequired,
};

export default Tax;
