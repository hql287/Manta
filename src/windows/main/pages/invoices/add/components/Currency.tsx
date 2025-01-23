// Libraries
import React, { useState, useEffect, useCallback } from 'react'
import { keys, sortBy, isEqual } from 'lodash'
import currencies from '@uiLibs/currencies.json'
import { Section, Header } from '@uiSharedComponents/Section'
import { Row, Field, Part } from '@uiSharedComponents/Part'
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

interface CurrencyProps {
  currency: {
    code: string
    separator: string
    placement: string
    fraction: number
  }
  savedSettings: {
    code: string
    separator: string
    placement: string
    fraction: number
  }
  t: (key: string) => string
  updateFieldData: (field: string, data: any) => void
  updateSavedSettings: (field: string, data: any) => void
}

const Currency: React.FC<CurrencyProps> = ({
  currency,
  savedSettings,
  t,
  updateFieldData,
  updateSavedSettings,
}) => {
  const [state, setState] = useState(currency)

  // Sync state with props
  useEffect(() => {
    if (!isEqual(state, savedSettings)) {
      if (isEqual(currency, savedSettings)) {
        setState(savedSettings)
        updateCurrencyState(savedSettings)
      }
    }
  }, [currency, savedSettings])

  const updateCurrencyState = useCallback(
    (newState: typeof state) => {
      updateFieldData('currency', newState)
    },
    [updateFieldData]
  )

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setState((prevState) => {
      const updatedValue = name === 'fraction' ? parseInt(value, 10) : value
      const updatedState = { ...prevState, [name]: updatedValue }
      updateCurrencyState(updatedState)
      return updatedState
    })
  }

  const isSettingsSaved = useCallback(() => {
    return isEqual(state, savedSettings)
  }, [state, savedSettings])

  const saveAsDefault = () => {
    updateSavedSettings('currency', state)
  }

  const sortCurrencies = useCallback(() => {
    const currenciesKeys = keys(currencies)
    const currenciesKeysAndValues = currenciesKeys.map((key) => [
      key,
      currencies[key].name,
      currencies[key].code,
    ])
    const currenciesSorted = sortBy(currenciesKeysAndValues, [
      (array) => array[1],
    ])
    return currenciesSorted.map(([key, name, code]) => (
      <option value={code} key={key}>
        {name}
      </option>
    ))
  }, [])

  return (
    <Section>
      <Header>
        <label className="itemLabel">{t('form:fields:currency')}</label>
        {!isSettingsSaved() && (
          <a href="#" onClick={saveAsDefault}>
            <i className="ion-checkmark" /> {t('common:saveAsDefault')}
          </a>
        )}
      </Header>
      <Part>
        <Row>
          <Field>
            <label className="itemLabel">{t('form:fields:currency')}</label>
            <select name="code" value={state.code} onChange={handleInputChange}>
              {sortCurrencies()}
            </select>
          </Field>
          <Field>
            <label className="itemLabel">
              {t('settings:fields:currency:separator')}
            </label>
            <select
              name="separator"
              value={state.separator}
              onChange={handleInputChange}
            >
              <option value="commaDot">
                1,999.000 ({t('settings:fields:currency:commaDot')})
              </option>
              <option value="dotComma">
                1.999,000 ({t('settings:fields:currency:dotComma')})
              </option>
              <option value="spaceDot">
                1 999.000 ({t('settings:fields:currency:spaceDot')})
              </option>
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
              value={state.placement}
              onChange={handleInputChange}
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
              value={state.fraction}
              onChange={handleInputChange}
            />
          </Field>
        </Row>
      </Part>
    </Section>
  )
}

export default _withFadeInAnimation(Currency)
