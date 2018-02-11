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

function Currency({ t, currency, handleCurrencyChange }) {
  const { code, fraction, placement, separator } = currency;
  return [
    <label key="label" className="itemLabel">
      {t('form:fields:currency')}
    </label>,
    <Part key="part">
      <Row>
        <Field>
          <label className="itemLabel">{t('form:fields:currency')}</label>
          <select
            name="code"
            value={code}
            onChange={handleCurrencyChange}
          >
            {sortCurrencies()}
          </select>
        </Field>
        <Field>
          <label className="itemLabel">{t('settings:fields:currency:separator')}</label>
          <select
            name="separator"
            value={separator}
            onChange={handleCurrencyChange}
          >
            <option value="commaDot">1,999.000 (Comma & Dot )</option>
            <option value="dotComma">1.999,000 (Dot & Comma)</option>
            <option value="spaceDot">1 999.000 (Space & Dot)</option>
          </select>
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">{t('settings:fields:currency:placement')}</label>
          <select
            name="placement"
            value={placement}
            onChange={handleCurrencyChange}
          >
            <option value="before">{t('settings:fields:currency:beforeAmount')}</option>
            <option value="after">{t('settings:fields:currency:afterAmount')}</option>
          </select>
        </Field>
        <Field>
          <label className="itemLabel">{t('settings:fields:currency:fraction')}</label>
          <input
            className="form-control"
            name="fraction"
            type="number"
            value={fraction}
            onChange={handleCurrencyChange}
          />
        </Field>
      </Row>
    </Part>,
  ];
}

Currency.propTypes = {
  currency: PropTypes.object.isRequired,
  handleCurrencyChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Currency;
