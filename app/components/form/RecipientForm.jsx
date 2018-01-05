// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Animation
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
const Form = styled.div`
  padding: 20px;
  background: #f9fafa;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #f2f3f4;
`;

const Row = styled.div`
  display: flex;
  margin: 0 -15px;
`;

const Field = styled.div`
  flex: 1;
  margin: 0 15px 20px 15px;
`;

export function RecipientForm({ formData, updateRecipientForm }) {
  const { fullname, company, email, phone } = formData;
  return (
    <Form>
      <Row>
        <Field>
          <label className="itemLabel">Full Name *</label>
          <input
            name="fullname"
            type="text"
            value={fullname || ''}
            onChange={updateRecipientForm}
          />
        </Field>
        <Field>
          <label className="itemLabel">Company</label>
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
          <label className="itemLabel">Email *</label>
          <input
            name="email"
            type="text"
            value={email || ''}
            onChange={updateRecipientForm}
          />
        </Field>
        <Field>
          <label className="itemLabel">Phone Number</label>
          <input
            name="phone"
            type="text"
            value={phone || ''}
            onChange={updateRecipientForm}
          />
        </Field>
      </Row>
    </Form>
  );
}

// PropTypes Validation
RecipientForm.propTypes = {
  formData: PropTypes.object,
  updateRecipientForm: PropTypes.func.isRequired,
};

RecipientForm.defaultProps = {
  formData: {},
};

export default _withFadeInAnimation(RecipientForm);
