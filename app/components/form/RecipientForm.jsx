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

// Component
function RecipientForm(props) {
  const {fullname, company, phone, email} = props.currentRecipientData;
  return (
    <Form>
      <Row>
        <Field>
          <label className="itemLabel">Full Name *</label>
          <input
            name="fullname"
            type="text"
            value={fullname ? fullname : ''}
            onChange={props.handleRecipientFormInputChange}
          />
        </Field>
        <Field>
          <label className="itemLabel">Company</label>
          <input
            name="company"
            type="text"
            value={company ? company : ''}
            onChange={props.handleRecipientFormInputChange}
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">Email *</label>
          <input
            name="email"
            type="text"
            value={email ? email : ''}
            onChange={props.handleRecipientFormInputChange}
          />
        </Field>
        <Field>
          <label className="itemLabel">Phone Number</label>
          <input
            name="phone"
            type="text"
            value={phone ? phone : ''}
            onChange={props.handleRecipientFormInputChange}
          />
        </Field>
      </Row>
    </Form>
  );
}

// PropTypes Validation
RecipientForm.propTypes = {
  currentRecipientData: PropTypes.object,
  handleRecipientFormInputChange: PropTypes.func.isRequired,
};

RecipientForm.defaultProps = {
  currentRecipientData: {},
};

export default _withFadeInAnimation(RecipientForm);
