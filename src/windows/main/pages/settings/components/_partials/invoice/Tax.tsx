import React from 'react'
import { Row, Field, Part } from '@uiSharedComponents/Part'

interface TaxProps {
  t: (key: string) => string
  tax: { tin: string; amount: number; method: string }
  handleTaxChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

const Tax: React.FC<TaxProps> = ({ t, tax, handleTaxChange }) => {
  return (
    <>
      <label className="itemLabel">{t('settings:fields:taxSettings')}</label>
      <Part>
        <Row>
          <Field>
            <label className="itemLabel">{t('form:fields:tax:id')}</label>
            <input
              name="tin"
              type="text"
              value={tax?.tin}
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
              value={tax?.amount}
              onChange={handleTaxChange}
              placeholder={t('common:amount')}
            />
          </Field>
          <Field>
            <label className="itemLabel">{t('form:fields:tax:method')}</label>
            <select
              name="method"
              value={tax?.method}
              onChange={handleTaxChange}
            >
              <option value="default">{t('common:default')}</option>
              <option value="reverse">{t('form:fields:tax:reverse')}</option>
            </select>
          </Field>
        </Row>
      </Part>
    </>
  )
}

export default Tax
