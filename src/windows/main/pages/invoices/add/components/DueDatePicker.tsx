// Libraries
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { format, parseISO } from 'date-fns'

// Styles
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const ClearDateButton = styled.a`
  margin-left: 10px;
  color: red;
  cursor: pointer;

  &:hover {
    color: darkred;
  }

  i {
    font-size: 20px;
  }
`

// Component
interface DueDatePickerProps {
  selectedDate: string | null
  t: (key: string) => string
  updateCustomDate: (date: string | null) => void
}

const DueDatePicker: React.FC<DueDatePickerProps> = ({
  selectedDate,
  t,
  updateCustomDate,
}) => {
  const [focused, setFocused] = useState(false)

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : null
    updateCustomDate(formattedDate)
  }

  const clearDate = () => {
    handleDateChange(null)
  }

  const parsedDate = selectedDate ? parseISO(selectedDate) : null

  return (
    <Container>
      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        placeholderText={t('form:fields:dueDate:placeHolder')}
        dateFormat="dd/MM/yyyy"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {selectedDate && (
        <ClearDateButton onClick={clearDate}>
          <i className="ion-close-circled" />
        </ClearDateButton>
      )}
    </Container>
  )
}

export default _withFadeInAnimation(DueDatePicker)
