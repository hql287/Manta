// Libraries
import type React from 'react'
import { useState, useEffect } from 'react'
import type ChangeEvent from 'react'
import { isEmpty } from 'lodash'

// Custom Components
import { Section } from '@uiSharedComponents/Section'

// Animation
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

// Styles
import styled from 'styled-components'

const DiscountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const DiscountContent = styled.div`
  display: flex;
  flex-direction: column;
`
const DiscountAmount = styled.div`
  flex: 1;
`
const DiscountType = styled.div`
  flex: 1;
  margin-top: 10px;
`

// Type Definitions
interface DiscountProps {
  discount: {
    amount?: number
    type?: 'percentage' | 'flat'
  }
  t: (key: string) => string
  updateFieldData: (field: string, value: any) => void
}

const Discount: React.FC<DiscountProps> = ({
  discount,
  t,
  updateFieldData,
}) => {
  const [amount, setAmount] = useState<string | number>('')
  const [type, setType] = useState<'percentage' | 'flat'>('percentage')

  useEffect(() => {
    // Initialize state with discount props
    if (discount) {
      setAmount(discount.amount || '')
      setType(discount.type || 'percentage')
    }
  }, [discount])

  useEffect(() => {
    // Update discount state whenever `amount` or `type` changes
    updateFieldData('discount', { amount, type })
  }, [amount, type, updateFieldData])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name === 'amount') {
      setAmount(value === '' ? '' : parseInt(value, 10))
    } else if (name === 'type') {
      setType(value as 'percentage' | 'flat')
    }
  }

  return (
    <Section>
      <DiscountWrapper>
        <label className="itemLabel">{t('form:fields:discount.name')}</label>
        <DiscountContent>
          <DiscountAmount>
            <input
              name="amount"
              type="number"
              value={amount}
              onChange={handleInputChange}
              placeholder={t('common:amount')}
            />
          </DiscountAmount>
          <DiscountType>
            <div className="radio">
              <label>
                <input
                  name="type"
                  type="radio"
                  value="percentage"
                  onChange={handleInputChange}
                  checked={type === 'percentage'}
                />
                {t('form:fields:discount:percentage')}
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  name="type"
                  type="radio"
                  value="flat"
                  onChange={handleInputChange}
                  checked={type === 'flat'}
                />
                {t('form:fields:discount:flat')}
              </label>
            </div>
          </DiscountType>
        </DiscountContent>
      </DiscountWrapper>
    </Section>
  )
}

// Exports
export default _withFadeInAnimation(Discount)
