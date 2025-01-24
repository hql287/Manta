// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Animation
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
import { Part, Row, Field } from '../shared/Part';

export function RecipientForm({ t, formData, updateRecipientForm }) {
  const { fullname, company, email, phone, address } = formData;
  return (
    <Part>
      <Row>
        <Field>
          <label className="itemLabel">{t('common:fields:fullname')} *</label>
          <input
            name="fullname"
            type="text"
            value={fullname || ''}
            onChange={updateRecipientForm}
          />
        </Field>
        <Field>
          <label className="itemLabel">{t('common:fields:company')}</label>
          <input
            name="company"
            type="text"
            value={company || ''}
            onChange={updateRecipientForm}
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">{t('common:fields:email')} *</label>
          <input
            name="email"
            type="text"
            value={email || ''}
            onChange={updateRecipientForm}
          />
        </Field>
        <Field>
          <label className="itemLabel">{t('common:fields:phone')}</label>
          <input
            name="phone"
            type="text"
            value={phone || ''}
            onChange={updateRecipientForm}
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">{t('common:fields:address')}</label>
          <input
            name="address"
            type="text"
            value={address || ''}
            onChange={updateRecipientForm}
          />
        </Field>
      </Row>
    </Part>
  );
}

// PropTypes Validation
RecipientForm.propTypes = {
  formData: PropTypes.object,
  t: PropTypes.func.isRequired,
  updateRecipientForm: PropTypes.func.isRequired,
};

RecipientForm.defaultProps = {
  formData: {},
};

export default _withFadeInAnimation(RecipientForm);
