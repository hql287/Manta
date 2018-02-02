import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, sortBy } from 'lodash';

import currencies from '../../../../../libs/currencies.json';
import { Row, Field, Part } from '../../../shared/Part';

function sortCurrencies() {
  const currenciesKeys = keys(currencies);
  const currenciesKeysAndValues = currenciesKeys.map(key => [
    key,
    currencies[key].name,
    currencies[key].code,
  ]);
  const currenciesSorted = sortBy(currenciesKeysAndValues, [array => array[1]]);
  return currenciesSorted.map(obj => {
    const [key, name, code] = obj;
    const optionKey = code;
    const optionValue = code;
    const optionLabel = name;
    return (
      <option value={optionValue} key={optionKey}>
        {optionLabel}
      </option>
    );
  });
}

function Currency({
  currency,
  handleInputChange,
  decimalSeparator,
  currencyPlacement,
  decimalFractions,
}) {
  return [
    <label key="label" className="itemLabel">
      Currency
    </label>,
    <Part key="part">
      <Row>
        <Field>
          <label className="itemLabel">Currency</label>
          <select name="currency" value={currency} onChange={handleInputChange}>
            {sortCurrencies()}
          </select>
        </Field>
        <Field>
          <label className="itemLabel">Decimal Separator</label>
          <select
            name="decimalSeparator"
            value={decimalSeparator}
            onChange={handleInputChange}
          >
            <option value="dot">Dot (.)</option>
            <option value="comma">Comma (,)</option>
          </select>
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">Sign placement</label>
          <select
            name="currencyPlacement"
            value={currencyPlacement}
            onChange={handleInputChange}
          >
            <option value="before">Before amount</option>
            <option value="after">After amount</option>
          </select>
        </Field>
        <Field>
          <label className="itemLabel">Decimal Fractions</label>
          <input
            className="form-control"
            name="decimalFractions"
            type="number"
            value={decimalFractions}
            onChange={handleInputChange}
          />
        </Field>
      </Row>
    </Part>,
  ];
}

Currency.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyPlacement: PropTypes.string.isRequired,
  decimalFractions: PropTypes.string.isRequired,
  decimalSeparator: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Currency;
