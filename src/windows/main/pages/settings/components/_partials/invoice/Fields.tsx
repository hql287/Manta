import React from 'react'

interface RequiredFields {
  invoiceID: boolean
  dueDate: boolean
  currency: boolean
  discount: boolean
  tax: boolean
  note: boolean
}

interface FieldsProps {
  t: (key: string) => string
  required_fields: RequiredFields
  handleVisibilityChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

import { Row, Field, Part } from '@uiSharedComponents/Part'

const Fields: React.FC<FieldsProps> = ({
  t,
  required_fields,
  handleVisibilityChange,
}) => {
  return (
    <>
      <label className="itemLabel">{t('settings:fields:requiredFields')}</label>
      <Part>
        <Row>
          <Field>
            <label className="itemLabel">
              {t('invoices:fields:invoiceID')}
            </label>
            <label className="switch">
              <input
                name="invoiceID"
                type="checkbox"
                checked={required_fields?.invoiceID}
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
                checked={required_fields?.dueDate}
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
                checked={required_fields?.currency}
                onChange={handleVisibilityChange}
              />
              <span className="slider round" />
            </label>
          </Field>
          <Field>
            <label className="itemLabel">
              {t('form:fields:discount:name')}
            </label>
            <label className="switch">
              <input
                name="discount"
                type="checkbox"
                checked={required_fields?.discount}
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
                checked={required_fields?.tax}
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
                checked={required_fields?.note}
                onChange={handleVisibilityChange}
              />
              <span className="slider round" />
            </label>
          </Field>
        </Row>
      </Part>
    </>
  )
}

export default Fields
