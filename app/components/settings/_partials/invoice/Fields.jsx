import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Field, Part } from '../../../shared/Part';

function Fields({ t, required_fields, handleVisibilityChange }) {
  return [
    <label key="label" className="itemLabel">
      {t('settings:fields:requiredFields')}
    </label>,
    <Part key="part">
      <Row>
        <Field>
          <label className="itemLabel">{t('invoices:fields:invoiceID')}</label>
          <label className="switch">
            <input
              name="invoiceID"
              type="checkbox"
              checked={required_fields.invoiceID}
              onChange={handleVisibilityChange}
            />
            <span className="slider round" />
          </label>
        </Field>
        <Field>
          <label className="itemLabel">{t('form:fields:dueDate:name')}</label>
          <label className="switch">
            <input
              name="dueDate"
              type="checkbox"
              checked={required_fields.dueDate}
              onChange={handleVisibilityChange}
            />
            <span className="slider round" />
          </label>
        </Field>
        <Field>
          <label className="itemLabel">{t('form:fields:currency')}</label>
          <label className="switch">
            <input
              name="currency"
              type="checkbox"
              checked={required_fields.currency}
              onChange={handleVisibilityChange}
            />
            <span className="slider round" />
          </label>
        </Field>

        <Field>
          <label className="itemLabel">{t('form:fields:discount:name')}</label>
          <label className="switch">
            <input
              name="discount"
              type="checkbox"
              checked={required_fields.discount}
              onChange={handleVisibilityChange}
            />
            <span className="slider round" />
          </label>
        </Field>
        <Field>
          <label className="itemLabel">{t('form:fields:tax:name')}</label>
          <label className="switch">
            <input
              name="tax"
              type="checkbox"
              checked={required_fields.tax}
              onChange={handleVisibilityChange}
            />
            <span className="slider round" />
          </label>
        </Field>
        <Field>
          <label className="itemLabel">{t('form:fields:note')}</label>
          <label className="switch">
            <input
              name="note"
              type="checkbox"
              checked={required_fields.note}
              onChange={handleVisibilityChange}
            />
            <span className="slider round" />
          </label>
        </Field>
      </Row>
    </Part>,
  ];
}

Fields.propTypes = {
  required_fields: PropTypes.object.isRequired,
  handleVisibilityChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Fields;
