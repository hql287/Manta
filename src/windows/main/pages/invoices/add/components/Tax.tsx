import React, { useState, useEffect } from 'react'
import { isEqual } from 'lodash'
import styled from 'styled-components'
import { Section, Header } from '@uiSharedComponents/Section'
import { Part, Row, Field } from '@uiSharedComponents/Part'
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

const TaxID = styled.div``
const TaxAmount = styled.div`
  flex: 1;
`

interface TaxProps {
  t: (key: string) => string
  tax: { tin: string; amount: number; method: string }
  savedSettings: { tin: string; amount: number; method: string }
  updateFieldData: (field: string, value: object) => void
  updateSavedSettings: (field: string, value: object) => void
}

const Tax: React.FC<TaxProps> = ({
  t,
  tax,
  savedSettings,
  updateFieldData,
  updateSavedSettings,
}) => {
  const [state, setState] = useState(tax)

  useEffect(() => {
    if (!isEqual(state, savedSettings) && isEqual(tax, savedSettings)) {
      setState(savedSettings)
      updateFieldData('tax', savedSettings)
    }
  }, [tax, savedSettings, state, updateFieldData])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    const parsedValue = name === 'amount' ? parseFloat(value) : value

    setState((prevState) => {
      const newState = { ...prevState, [name]: parsedValue }
      updateFieldData('tax', newState)
      return newState
    })
  }

  const isSettingsSaved = () => isEqual(state, savedSettings)

  const saveAsDefault = () => {
    updateSavedSettings('tax', state)
  }

  return (
    <Section>
      <Header>
        <label className="itemLabel">{t('form:fields:tax:name')}</label>
        {!isSettingsSaved() && (
          <a href="#" onClick={saveAsDefault}>
            <i className="ion-checkmark" /> {t('common:saveAsDefault')}
          </a>
        )}
      </Header>
      <Part>
        <Row>
          <Field>
            <label className="itemLabel">{t('form:fields:tax:id')}</label>
            <TaxID>
              <input
                name="tin"
                type="text"
                value={state.tin}
                onChange={handleInputChange}
                placeholder={t('form:fields:tax:id')}
              />
            </TaxID>
          </Field>
        </Row>
        <Row>
          <Field>
            <label className="itemLabel">{t('common:amount')} (%)</label>
            <TaxAmount>
              <input
                name="amount"
                type="number"
                step="0.01"
                value={state.amount}
                onChange={handleInputChange}
                placeholder={t('common:amount')}
              />
            </TaxAmount>
          </Field>
          <Field>
            <label className="itemLabel">{t('form:fields:tax:method')}</label>
            <select
              name="method"
              value={state.method}
              onChange={handleInputChange}
            >
              <option value="default">{t('common:default')}</option>
              <option value="reverse">{t('form:fields:tax:reverse')}</option>
            </select>
          </Field>
        </Row>
      </Part>
    </Section>
  )
}

export default _withFadeInAnimation(Tax)
