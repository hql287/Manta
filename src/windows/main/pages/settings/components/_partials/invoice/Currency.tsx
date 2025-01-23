import React from 'react'
import { keys, sortBy } from 'lodash'

import currencies from '@uiLibs/currencies.json'
import { Row, Field, Part } from '@uiSharedComponents/Part'

interface CurrencyProps {
  t: (key: string) => string
  currency: {
    code: string
    fraction: number
    placement: string
    separator: string
  }
  handleCurrencyChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

const sortCurrencies = () => {
  const currenciesKeys = keys(currencies)
  const currenciesKeysAndValues = currenciesKeys.map((key) => [
    key,
    currencies[key].name,
    currencies[key].code,
  ])
  const currenciesSorted = sortBy(currenciesKeysAndValues, [
    (array) => array[1],
  ])
  return currenciesSorted.map((obj) => {
    const [key, name, code] = obj
    const optionKey = code
    const optionValue = code
    const optionLabel = name
    return (
      <option value={optionValue} key={optionKey}>
        {optionLabel}
      </option>
    )
  })
}

const Currency: React.FC<CurrencyProps> = ({
  t,
  currency = { code: '', fraction: 0, placement: '', separator: '' },
  handleCurrencyChange,
}) => {
  const { code, fraction, placement, separator } = currency

  return (
    <>
      <label className="itemLabel">{t('form:fields:currency')}</label>
      <Part>
        <Row>
          <Field>
            <label className="itemLabel">{t('form:fields:currency')}</label>
            <select name="code" value={code} onChange={handleCurrencyChange}>
              {sortCurrencies()}
            </select>
          </Field>
          <Field>
            <label className="itemLabel">
              {t('settings:fields:currency:separator')}
            </label>
            <select
              name="separator"
              value={separator}
              onChange={handleCurrencyChange}
            >
              <option value="commaDot">1,999.000 (Comma & Dot)</option>
              <option value="dotComma">1.999,000 (Dot & Comma)</option>
              <option value="spaceDot">1 999.000 (Space & Dot)</option>
            </select>
          </Field>
        </Row>
        <Row>
          <Field>
            <label className="itemLabel">
              {t('settings:fields:currency:placement')}
            </label>
            <select
              name="placement"
              value={placement}
              onChange={handleCurrencyChange}
            >
              <option value="before">
                {t('settings:fields:currency:beforeAmount')}
              </option>
              <option value="after">
                {t('settings:fields:currency:afterAmount')}
              </option>
            </select>
          </Field>
          <Field>
            <label className="itemLabel">
              {t('settings:fields:currency:fraction')}
            </label>
            <input
              className="form-control"
              name="fraction"
              type="number"
              value={fraction}
              onChange={handleCurrencyChange}
            />
          </Field>
        </Row>
      </Part>
    </>
  )
}

export default Currency
