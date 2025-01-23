// Libraries
import React, { FC, ChangeEvent } from 'react'

// Animation
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

// Styles
import { Part, Row, Field } from '@uiSharedComponents/Part'

interface RecipientFormProps {
  formData: {
    fullname?: string
    company?: string
    email?: string
    phone?: string
  }
  updateRecipientForm: (event: ChangeEvent<HTMLInputElement>) => void
}

const RecipientForm: FC<RecipientFormProps> = ({
  formData,
  updateRecipientForm,
}) => {
  const { fullname = '', company = '', email = '', phone = '' } = formData

  return (
    <Part>
      <Row>
        <Field>
          <label className="itemLabel">Full Name *</label>
          <input
            name="fullname"
            type="text"
            value={fullname}
            onChange={updateRecipientForm}
          />
        </Field>
        <Field>
          <label className="itemLabel">Company</label>
          <input
            name="company"
            type="text"
            value={company}
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
            value={email}
            onChange={updateRecipientForm}
          />
        </Field>
        <Field>
          <label className="itemLabel">Phone</label>
          <input
            name="phone"
            type="text"
            value={phone}
            onChange={updateRecipientForm}
          />
        </Field>
      </Row>
    </Part>
  )
}

export default _withFadeInAnimation(RecipientForm)
