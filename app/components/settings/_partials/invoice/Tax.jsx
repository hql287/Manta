import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Field, Part } from '../../../shared/Part';

function Tax({ t, tax, handleTaxChange }) {
  return [
    <label key="label" className="itemLabel">
      {t('settings:fields:taxSettings')}
    </label>,
    <Part key="part">
      <Row>
        <Field>
          <label className="itemLabel">{t('form:fields:tax:id')}</label>
          <input
            name="tin"
            type="text"
            value={tax.tin}
            onChange={handleTaxChange}
            placeholder={t('form:fields:tax:id')}
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">{t('common:amount')}</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            value={tax.amount}
            onChange={handleTaxChange}
            placeholder={t('common:amount')}
          />
        </Field>
        <Field>
          <label className="itemLabel">{t('form:fields:tax:method')}</label>
          <select name="method" value={tax.method} onChange={handleTaxChange}>
            <option value="default">{t('common:default')}</option>
            <option value="reverse">{t('form:fields:tax:reverse')}</option>
          </select>
        </Field>
      </Row>
    </Part>,
  ];
}

Tax.propTypes = {
  tax: PropTypes.object.isRequired,
  handleTaxChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Tax;
